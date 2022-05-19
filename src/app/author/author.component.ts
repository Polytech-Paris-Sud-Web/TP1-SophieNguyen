import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { AuthorService } from "../author.service";
import { Router } from "@angular/router";
import { Author } from "./author";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
/**
 * Author biography page
 */
export class AuthorComponent implements OnInit, OnDestroy {

  /** Observable execution */
  private authorSub: Subscription | undefined;
  /** Current author */
  author: Author | undefined;

  constructor(private authorService: AuthorService, private router: Router) { }

  ngOnInit(): void {
    const id = Number(/\/authors\/(\d+)/g.exec(this.router.url)?.[1]);
    if (id) {
      this.fetch(id);
    }
  }

  /**
   * Fill author data to display
   *
   * @param id Current author identifier
   */
  fetch(id: number) {
    this.authorSub = this.authorService.getAuthor(id).subscribe({
      next: (data) => this.author = data
    });
  }

  ngOnDestroy(): void {
    this.authorSub?.unsubscribe();
  }

}
