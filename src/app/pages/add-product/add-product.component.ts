import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { CameraService } from '../../services/camera.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  images: { base64: string; url: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private cameraService: CameraService
  ) {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [null, [Validators.min(0)]]
    });
  }

  ngOnInit(): void {}

  async takePhoto(): Promise<void> {
    if (this.images.length >= 3) {
      this.errorMessage = 'Vous pouvez ajouter jusqu\'à 3 images par produit.';
      return;
    }
    try {
      const base64 = await this.cameraService.takePhoto();
      if (base64) {
        const file = this.base64ToFile(base64, `photo-${Date.now()}.jpg`);
        const url = URL.createObjectURL(file);
        this.images.push({ base64, url });
        this.errorMessage = ''; // Clear any previous error
      }
    } catch (error: any) {
      console.error('Camera error:', error);
      if (error.message?.includes('User cancelled')) {
        // User cancelled, no error message needed
      } else if (error.message?.includes('Permission denied')) {
        this.errorMessage = 'Permission d\'accès à la caméra refusée';
      } else {
        this.errorMessage = 'Erreur lors de la prise de photo. Vérifiez les permissions de la caméra.';
      }
    }
  }

  private base64ToFile(base64: string, filename: string): File {
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const userId = this.authService.getUserId();
      if (!userId) {
        this.errorMessage = 'Utilisateur non connecté';
        return;
      }

      const formValue = this.productForm.value;
      const productData = {
        ...formValue,
        userId
      };

      this.productService.createProduct(productData).subscribe({
        next: (response) => {
          const product = response;
          // Upload images
          this.images.forEach((img, index) => {
            const file = this.base64ToFile(img.base64, `photo-${index}.jpg`);
            this.productService.uploadImage(product.id, file).subscribe({
              next: () => {},
              error: (err) => console.error('Upload error', err)
            });
          });
          this.successMessage = 'Produit ajouté avec succès!';
          this.productForm.reset();
          this.images = [];
          setTimeout(() => {
            this.router.navigate(['/products']);
          }, 2000);
        },
        error: (error) => {
          this.errorMessage = error.error?.error || 'Erreur lors de l\'ajout du produit';
        }
      });
    } else {
      this.errorMessage = 'Veuillez corriger les erreurs dans le formulaire';
    }
  }
}
