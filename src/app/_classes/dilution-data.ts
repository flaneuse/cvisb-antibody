export class DilutionDatum {
  dilution_factor: number;
  fluor_score: number;
  dilution?: number;
}

export class DilutionData {
  expt_id: string;
  sample_id: string;
  sample_mean: number;
  values: DilutionDatum[];
  constructor() {
    // this.dilution = this.dilution_factor.map(d => 1/d);
  }
}
