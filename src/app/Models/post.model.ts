export class Post {
// tslint:disable-next-line: max-line-length
  constructor (Id?, clientName?, discoveryType?, dateServed?, byCtorder?, dueDate?, directedToParty?, directedTo?, servedBy?, due?, toCltForCert?, servedDate?, discNotes?,
    caseStatus?,
    clientStatus?,
    answered?,
    srvdOnDef?,
    srvdOnPlt?,
    ltSent?,
    certReceived?
    ) {
    this.Id = Id;
    this.clientName = clientName;
    this.discoveryType = discoveryType;
    this.dateServed = dateServed;
    this.byCtorder = byCtorder;
    this.dueDate = dueDate;
    this.directedToParty = directedToParty;
    this.directedTo = directedTo;
    this.servedBy = servedBy;
    this.due = due;
    this.toCltforCert = toCltForCert;
    // this.servedDate = servedDate;
    this.discNotes = discNotes;

    this.caseStatus = caseStatus;
    this.clientStatus = clientStatus;
    this.answered = answered;
    this.srvdOnDef = srvdOnDef;
    this.srvdOnPlt = srvdOnPlt;
    this.ltSent = ltSent;
    this.certReceived = certReceived;
  }
  Id;
  clientName: string = '';
  discoveryType: string = '';
  dateServed: string = '';
  byCtorder: boolean = false;
  dueDate: string = '';
  directedToParty: string = '';
  directedTo: string = '';
  servedBy: string = '';
  due: string = '';
  toCltforCert: string = '';
  servedDate:  string = '';
  discNotes: string = '';
  caseStatus: boolean = false;
  clientStatus: boolean = false;
  answered: string = '';
  srvdOnDef: boolean = false;
  srvdOnPlt: boolean = false;
  ltSent: string = '';
  certReceived: string = '';
}
