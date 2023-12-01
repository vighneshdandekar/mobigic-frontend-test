import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
Observable
@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

  private apiUrl = 'http://localhost:3000'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.apiUrl}/file/upload`, formData);
  }

  getUploadedFiles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/file`);

  }

  downloadUrl(fileId: string, password: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/file/${fileId}/${password}`);
  }

  downloadFile(url: string, fileName: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.target = '_blank'; // Open the link in a new tab (optional, based on your requirements)
    link.click();
  }


  removeFile(fileId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/file/${fileId}`);
  }
}
