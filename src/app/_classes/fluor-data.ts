export class FluorData {
  constructor(
    public filename: string,
    public MFI_all: number,
    public pct_fluor: number,
    public MFI: number,
    public plate: number,
    public well: string,
    public row: string,
    public col: number,
    public MFI_all_source: string,
    public pct_fluor_source: string,
    public MFI_source: string,
    public sample_id: string,
    public sample_type: string,
    public experiment: string,
    public sample_dilution: string,
    public cell_donor: string,
    public expt_id: string,
    public fluor_score: number,
    public fluor_score_type: string,
    public fluor_percentile: number,
    public sample_mean: number,
    public sample_std: number,
    public num_obs: number
  ) { }
}
