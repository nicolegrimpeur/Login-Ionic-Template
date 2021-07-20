import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SIdentifierPage } from './s-identifier.page';

describe('SIdentifierPage', () => {
  let component: SIdentifierPage;
  let fixture: ComponentFixture<SIdentifierPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SIdentifierPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SIdentifierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
