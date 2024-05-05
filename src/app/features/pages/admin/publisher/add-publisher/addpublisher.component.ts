import { Component } from '@angular/core';
import { Publisher } from '../../../../models/publisher';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PublisherService } from '../../../../services/publisher.service'; 
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-publisher',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './addpublisher.component.html',
  styleUrl: './addpublisher.component.scss'
})
export class AddPublisherComponent {
  publisherAddForm!:FormGroup;
 publisher:Publisher[]=[];

 constructor(private formBuilder:FormBuilder,
  private publisherService: PublisherService){}

  ngOnInit():void{
   this.createPublisherAddForm();

  }
  createPublisherAddForm(){
    this.publisherAddForm=this.formBuilder.group({
      name:["", (Validators.required, Validators.minLength(2))]
    })
  }
  addToDb():void{
    if(this.publisherAddForm.valid){
      const formData:Publisher=this.publisherAddForm.value;
      console.log(formData.name);
      this.publisherService.add(formData).subscribe((response)=>{
        alert(formData.name.toUpperCase()+" başarıyla eklendi");
      })
    }
  }

}