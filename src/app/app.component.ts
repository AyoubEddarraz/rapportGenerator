import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

// import { Editor } from 'ngx-editor';

import * as html2pdf from 'html2pdf.js';

import { Chart, registerables } from 'chart.js';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'teste';

  htmlContent: any;

  editorActive: boolean = false;

  ngOnInit(): void {
    this.htmlContent = localStorage.getItem("editorData");
  }

  // change the status of the editor
  changeEditorState() {
    this.editorActive = !this.editorActive;
  }


  // Content of the pages
  items: number[] = [1];
  counter: number;
  length: number;
  pdf:any;
  data:any;

  // Function to generate Pdf multi pages
  downloadPDF() {

      this.pdf = new jsPDF('p', 'mm', 'a4') // A4 size page of PDF
      this.length = this.items.length;
      this.counter = 0;

      this.generatePDF()
  }

  generatePDF() {

      this.data = document.getElementById('pdf' + this.counter)

      console.log(this.data);

      html2canvas((this.data), {
        scale: 3 // make better quality ouput
      }).then((canvas) => {

        this.counter++

        // Few necessary setting options
        var imgWidth = 208;
        var imgHeight = (canvas.height * imgWidth) / canvas.width;

        const contentDataURL = canvas.toDataURL('image/png')
        var position = 0
        this.pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);

        // Control if new page needed, else generate the pdf
        if (this.counter < this.length) {
            this.pdf.addPage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
            this.getLetter();
        } else {
            this.pdf.save('users.pdf') // Generated PDF
            return true
        }
      })
  }

  getLetter() {

  }

  dataEditorTextChanged(data){
    localStorage.setItem("editorData" , this.htmlContent);
  }

  // Id:number = 1;
  // @ViewChild("canvas_div_pdf") dataPDF : ElementRef;
  // downloadPDF() {

  //   console.log("this is the Element" ,  this.dataPDF.nativeElement);

  //   // this parte for create new parte of code this code for genearet multi pages pfd
  //   var Id = this.Id;

  //   html2canvas(this.dataPDF.nativeElement).then(function(canvas){

  //     console.log("this is the canvas " , canvas);

  //     var imgData = canvas.toDataURL("image/png");
  //     var imgWidth = 208;
  //     var pageHeight = 295;
  //     var imgHeight = (canvas.height * imgWidth) / canvas.width;
  //     var heightLeft = imgHeight;
  //     var doc = new jsPDF('p', 'mm', 'a4');
  //     var position = 0;
  //     doc.addImage(imgData, 'PNG', 5, position, imgWidth, imgHeight);
  //     heightLeft -= pageHeight;
  //     while(heightLeft >= 0){
  //       position = heightLeft - imgHeight;
  //       doc.addPage();
  //       doc.addImage(imgData, 'PNG', 5, position, imgWidth, imgHeight);
  //       heightLeft -= pageHeight;
  //     }

  //     console.log("this is the last line after the save the pdf ");


  //     doc.save(Id + '.pdf')
  //   })


  // }

}
