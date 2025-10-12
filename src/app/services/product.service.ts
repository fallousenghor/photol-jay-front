import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product, CreateProduct } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3007/api/products';
  private imageApiUrl = 'http://localhost:3007/api/product-images';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: CreateProduct): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }

  uploadImage(productId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('productId', productId);
    formData.append('image', file);

    return this.http.post(this.imageApiUrl, formData);
  }
}
