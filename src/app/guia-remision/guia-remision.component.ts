import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { GuiaRemisionService } from '../providers/guia-remision.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GuiaRemision } from '../models/guia-remision.model';
import { error } from 'util';
import 'rxjs/RX';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-guia-remision',
  templateUrl: 'guia-remision.component.html',
  providers: [GuiaRemision]
})
export class GuiaRemisionComponent implements OnInit {
  guias: Array<any> = [];
  guiaNumero: String;
  guiaIndex: number;
  private modalNotaRef: NgbModalRef;
  private sub: any;
  anularAction: boolean;

  // Pagination
  public page = 1;
  public totalItems = 0;
  private localGuiaRemision: Array<GuiaRemision[]> = [];

  public query: string;
  public checked: boolean;
  public notaNumero: string;

  public userName: string;  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: GuiaRemisionService,
    private modalService: NgbModal,
    private cookie: CookieService
  ) {
    this.getAllGuias();
    this.userName = this.cookie.get('me');
  }

  ngOnInit() {
    this.guiaNumero = this.route.snapshot.queryParams['id'];
  }

  goToForm(): void {
    this.router.navigateByUrl('guia-remision/new');
  }

  getAllGuias() {
    this.api.getAll().subscribe(data => {
      const guias = data['data'];
      let i,
        j,
        temparray;
      const chunk = 10;
      for (i = 0, j = guias.length; i < j; i += chunk) {
        temparray = guias.slice(i, i + chunk);
        this.localGuiaRemision.push(temparray);
      }

      this.guias = this.localGuiaRemision[0];
      this.totalItems = guias.length;
    });
  }

  getPagination(e) {
    this.guias = this.localGuiaRemision[e - 1];
  }

  openAnularModal(content, index) {
    this.guiaIndex = index;
    console.log(index);
    this.modalNotaRef = this.modalService.open(content);
  }

  anular() {
    const guia = this.guias[this.guiaIndex];
    this.guias[this.guiaIndex].status = 'canceled';
    this.anularAction = true;

    this.api.cancel(guia.uuid).subscribe(
      data => {
        this.modalNotaRef.close();
        // tslint:disable-next-line:no-shadowed-variable
      },
      error => {
        this.modalNotaRef.close();
        console.log(error);
      }
    );
  }
}
