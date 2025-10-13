import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product, CreateProduct } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3007/api/products';
  private imageApiUrl = 'http://localhost:3007/api/product-images';

  constructor(private http: HttpClient) { }

  getProducts(categoryId?: number): Observable<Product[]> {
    let params = new HttpParams();
    if (categoryId) {
      params = params.set('categoryId', categoryId.toString());
    }
    return this.http.get<Product[]>(this.apiUrl, { params });
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: CreateProduct): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  uploadImage(productId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('productId', productId);
    formData.append('image', file); // Utilisation de 'image' pour correspondre au champ attendu par multer dans le backend

    return this.http.post(this.imageApiUrl, formData);
  }
}
