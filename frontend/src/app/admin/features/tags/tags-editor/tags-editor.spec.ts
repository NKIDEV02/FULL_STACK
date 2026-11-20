import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TagsEditor } from './tags-editor';

describe('TagsEditor', () => {
  let component: TagsEditor;
  let fixture: ComponentFixture<TagsEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagsEditor],
    }).compileComponents();

    fixture = TestBed.createComponent(TagsEditor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
