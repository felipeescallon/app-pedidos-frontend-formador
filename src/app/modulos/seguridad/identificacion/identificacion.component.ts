import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import * as cryptoJS from "crypto-js";//así se importa en TS (previamente ejecutado los dos siguientes: npm i cryptojs (cambiado por npm i crypto-js) ; npm i @types/crypto-js)
//const cryptoJS = require("cryptojs");//esto es para JS NO PARA TS
import { Router } from '@angular/router';

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css']
})
export class IdentificacionComponent implements OnInit {

  fgValidador: FormGroup = this.fb.group({
    'usuario': ['', [Validators.required, Validators.email]],
    'clave': ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,//){ }//,
    private router: Router) { }

  ngOnInit(): void {
  }

  
  
  IdentificarUsuario(){
    let usuario = this.fgValidador.controls["usuario"].value;
    let clave = this.fgValidador.controls["clave"].value;     
    let claveCifrada = cryptoJS.MD5(clave).toString();  
    this.servicioSeguridad.Identificar(usuario, claveCifrada).subscribe((datos:any) => {
      //OK
      //alert("Datos correctos")
      this.servicioSeguridad.AlmacenarSesion(datos);
      this.router.navigate(["/inicio"]);
      
    }, (error: any) => {
      // KO
      alert("Datos Inválidos")
    })

  }

}
