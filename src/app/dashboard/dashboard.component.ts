import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FileServiceService } from '../file-service.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  uploadedFiles: string[] = [];
  selectedFile: File | null = null;
  password: string = ''
  closeResult: string;
  fileId: any;
  constructor(private fileService: FileServiceService, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.fetchUploadedFiles();
  }

  fetchUploadedFiles() {
    this.fileService.getUploadedFiles().subscribe(
      (response) => {
        this.uploadedFiles = response;
      },
      (error) => {
        console.error('Error fetching uploaded files', error);
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (this.selectedFile) {
      this.fileService.uploadFile(this.selectedFile).subscribe(
        (response) => {
          // Refresh the list of uploaded files
          this.fileInput.nativeElement.value = null;
          this.selectedFile = null
          this.fetchUploadedFiles();
        },
        (error) => {
          console.error('Error uploading file', error);
        }
      );
    } else {
      console.error('No file selected');
    }
  }

  downloadFile() {
    // Implement download logic
    this.fileService.downloadUrl(this.fileId, this.password).subscribe(
      (response) => {
        this.fileService.downloadFile(response?.url, response?.fileName)
        this.modalService.dismissAll('Password matched')
      },
      (error) => {
        console.error('Error downloading file', error);
      }
    );
  }


  removeFile(fileId: string) {


    // Implement remove logic
    this.fileService.removeFile(fileId).subscribe(
      (response) => {
        // Refresh the list of uploaded files
        this.fetchUploadedFiles();
      },
      (error) => {
        console.error('Error removing file', error);
      }
    );
  }

  logout() {
    localStorage.removeItem('mobigic_token');
    this.router.navigate(['/login'])
  }

  openDownload(content, fileId) {
    this.fileId = fileId;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        console.log(this.closeResult)
      },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          console.log(this.closeResult)
        });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
