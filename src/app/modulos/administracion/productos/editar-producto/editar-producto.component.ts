import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
id:string = '';//es necesario para la edición (no se usó en buscar-producto)
  fgValidador: FormGroup = this.fb.group({
    'id': ['', [Validators.required]],//es necesario para la edición (no se usó en buscar-producto)
    'nombre': ['', [Validators.required]],
    'precio': ['', [Validators.required]],
    'imagen': ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder,
    private servicioProdcuto: ProductoService,
    private router: Router,
    private route: ActivatedRoute) { }//para leer el id de la url

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];//para leer el id de la url
    this.BuscarProducto();
  }

  BuscarProducto(){
    this.servicioProdcuto.ObtenerRegistroPorId(this.id).subscribe((datos: ModeloProducto) => {
      this.fgValidador.controls["id"].setValue(this.id);//se asigna al campo id la id leida por la url (reasignación)
      this.fgValidador.controls["nombre"].setValue(datos.nombre);
      this.fgValidador.controls["precio"].setValue(datos.precio);
      this.fgValidador.controls["imagen"].setValue(datos.imagen);
    });
  }

  EditarProducto() {
    let nombre = this.fgValidador.controls["nombre"].value;
    let precio = parseInt(this.fgValidador.controls["precio"].value);
    let imagen = this.fgValidador.controls["imagen"].value;
    let p = new ModeloProducto();
    p.nombre = nombre;
    p.precio = precio;
    p.imagen = imagen;
    p.id = this.id;//también se le debe asignar el identificador (id)
    this.servicioProdcuto.ActualizarProducto(p).subscribe((datos: ModeloProducto) => {
      alert("Producto actualizado correctamente");
      this.router.navigate(["/administracion/listar-productos"]);
    }, (error: any) => {
      alert("Error actualizando el producto");
    })
  }


}