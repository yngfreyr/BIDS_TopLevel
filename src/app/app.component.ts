import { Component } from '@angular/core';
import {FormGroup,FormControl,FormBuilder} from '@angular/forms'


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
filterForm: FormGroup;
  filterFields: any[];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.filterFields = [

      {
        column1: 'Name',
        column2: 'REQUIRED',
        column3: 'string',
        key: "Name",
        title: "Name of the dataset.",
        type: "text"
      },
      {
        column1: 'DatasetType',
        column2: 'RECOMMENDED',
        column3: 'string',
        key: "DatasetType",
        title: "The interpretation of the dataset. For backwards compatibility, the default value is ‘raw’. Must be one of: ‘raw’, ‘derivative’.",
        type: "text"
      },
      {
        column1: 'EthicsApprovals',
        column2: 'OPTIONAL',
        column3: 'array of strings',
        key: "EthicsApprovals",
        title: "List of ethics committee approvals of the research protocols and/or protocol identifiers.",
        type: "text"
      },
      {
        column1: 'Funding',
        column2: 'OPTIONAL',
        column3: 'array of strings',
        key: "Funding",
        title: "List of sources of funding (grant numbers).",
        type: "text"
      },
      {
        column1: 'Authors',
        column2: 'RECOMMENDED',
        column3: 'array of strings',
        key: "Authors",
        title: "List of individuals who contributed to the creation/curation of the dataset.",
        type: "text"
      },
      {
        column1: 'Acknowledgements',
        column2: 'OPTIONAL',
        column3: 'string',
        key: "Acknowledgements",
        title: "Text acknowledging contributions of individuals or institutions beyond those listed in Authors or Funding.",
        type: "text"
      },
      {
        column1: 'HowToAcknowledge',
        column2: 'OPTIONAL',
        column3: 'string',
        key: "HowToAcknowledge",
        title: "Text containing instructions on how researchers using this dataset should acknowledge the original authors. This field can also be used to define a publication that should be cited in publications that use the dataset.",
        type: "text"
      },
      {
        column1: 'License',
        column2: 'RECOMMENDED',
        column3: 'string',
        key: "License",
        title: "The license for the dataset. The use of license name abbreviations is RECOMMENDED for specifying a license (see Licenses). The corresponding full license text MAY be specified in an additional LICENSE file.",
        type: "text"
      },
      {
        column1: 'BIDSVersion',
        column2: 'REQUIRED',
        column3: 'string',
        key: "BIDSVersion",
        title: "The version of the BIDS standard that was used.",
        type: "text"
      },
      {
        column1: 'HEDVersion',
        column2: 'RECOMMENDED',
        column3: 'string or array of strings',
        key: "HEDVersion",
        title: "If HED tags are used: The version of the HED schema used to validate HED tags for study. May include a single schema or a base schema and one or more library schema.",
        type: "text"
      },
      {
        column1: 'DatasetDOI',
        column2: 'OPTIONAL',
        column3: 'string',
        key: "DatasetDOI",
        title: "The Digital Object Identifier of the dataset (not the corresponding paper). DOIs SHOULD be expressed as a valid URI; bare DOIs such as 10.0.2.3/dfjj.10 are DEPRECATED.",
        type: "text"
      },
      {
        column1: 'DatasetLinks',
        column2: 'REQUIRED if BIDS URIs are used',
        column3: 'object of string',
        key: "DatasetLinks",
        title: "Used to map a given <dataset-name> from a BIDS URI of the form bids:<dataset-name>:path/within/dataset to a local or remote location. The <dataset-name>:  (an empty string) is a reserved keyword that MUST NOT be a key in DatasetLinks (example: bids::path/within/dataset).",
        type: "text"
      },
      {
        column1: 'ReferencesAndLinks',
        column2: 'OPTIONAL',
        column3: 'array of strings',
        key: "ReferencesAndLinks",
        title: "List of references to publications that contain information on the dataset. A reference may be textual or a URI.",
        type: "text"
      },
      {
        column1: 'GeneratedBy',
        column2: 'RECOMMENDED',
        column3: 'array of objects',
        key: "GeneratedBy",
        title: "Used to specify provenance of the dataset.",
        type: "text"
      },
      {
        column1: 'SourceDatasets',
        column2: 'RECOMMENDED',
        column3: 'array of objects',
        key: "SourceDatasets",
        title: "Used to specify the locations and relevant attributes of all source datasets. Valid keys in each object include 'URL', 'DOI' (see URI), and 'Version' with string values.",
        type: "text"
      },
      
      
    ];

    this.filterForm = this.generateFilterForm();
    this.filterForm.get('Authors').valueChanges.subscribe(() => {
      this.onAuthorsChange();
    });
    this.filterForm.get('Funding').valueChanges.subscribe(() => {
      this.onFundingChange();
    });
    this.filterForm.get('ReferencesAndLinks').valueChanges.subscribe(() => {
      this.onReferencesAndLinksChange();
    });
  }

  generateFilterForm(): FormGroup {
    const baseForm = this.fb.group({});
    this.filterFields.forEach(field => {
      baseForm.addControl(field.key, this.generateFormGroup(baseForm, field));
    });
    console.log(baseForm);
    return baseForm;
  }

  generateFormGroup(baseForm: FormGroup, field: { group: any[]; }): FormGroup|FormControl {
    if (field.group) {
      const formGroup = this.fb.group({});
      field.group.forEach(item => {
        formGroup.addControl(item.key, this.generateFormGroup(formGroup, item));
      });
      return formGroup;
    }

      return new FormControl("");
  }

  onAuthorsChange() {
    const authorsControl = this.filterForm.get('Authors');
    const authorsValue = authorsControl.value;
    if (typeof authorsValue === 'string') {
      const authors = authorsValue.split(',').map(author => author.replace(/^\s+/, ''));
      authorsControl.setValue(authors);
    }
  }

  onFundingChange() {
    const FundingControl = this.filterForm.get('Funding');
    const FundingValue = FundingControl.value;
    if (typeof FundingValue === 'string') {
      const Funding = FundingValue.split(',').map(Funding => Funding.replace(/^\s+/, ''));
      FundingControl.setValue(Funding);
    }
  }

  onReferencesAndLinksChange() {
    const ReferencesAndLinksControl = this.filterForm.get('ReferencesAndLinks');
    const ReferencesAndLinksValue = ReferencesAndLinksControl.value;
    if (typeof ReferencesAndLinksValue === 'string') {
      const ReferencesAndLinks = ReferencesAndLinksValue.split(',').map(ReferenceAndLink => ReferenceAndLink.replace(/^\s+/, ''));
      ReferencesAndLinksControl.setValue(ReferencesAndLinks);
    }
  }

  download() {
    // Get the form data as a JSON object
    const formData = this.filterForm.value;
  
    // Convert the form data to a string
    const dataString = JSON.stringify(formData, null, 2);
  
    // Create a new blob with the data
    const blob = new Blob([dataString], { type: 'application/json' });
  
    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob);
  
    // Create a new anchor element with the URL
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dataset_description.json';
  
    // Trigger a click on the anchor element
    document.body.appendChild(a);
    a.click();
  
    // Clean up the anchor element and URL object
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }  
}
