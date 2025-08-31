import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  public formattedPath: {
    basePath: string;
    currentPath: string;
  } = {
    basePath: '',
    currentPath: ''
  };
  constructor(private route: Router) {
    const resultPath = this.setRoute(this.route.url);
    this.formattedPath.basePath = resultPath.formattedPath;
    this.formattedPath.currentPath = resultPath.lastWord;
  }

  private setRoute(path: string): { formattedPath: string; lastWord: string } {
    const cleanPath = path.split('?')[0];

    const segments = cleanPath.split('/').filter(Boolean);

    const lastSegment = segments.pop();

    const formattedSegments = segments
      .map((segment) => segment.replace(/-/g, ' '))
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1));

    const formattedPath = formattedSegments.join(
      '\u00A0\u00A0\u00A0>\u00A0\u00A0\u00A0'
    );

    const lastWord =
      lastSegment && !/[0-9a-fA-F-]{36}/.test(lastSegment)
        ? lastSegment.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase())
        : '';

    return { formattedPath, lastWord };
  }
}
