import { Component } from '@angular/core';
import { TranslationBoxComponent } from '../landing/translation-box/translation-box.component';

@Component({
  selector: 'app-single-word',
  standalone: true,
  imports: [TranslationBoxComponent],
  templateUrl: './single-word.component.html',
  styleUrl: './single-word.component.scss',
})
export class SingleWordComponent {}
