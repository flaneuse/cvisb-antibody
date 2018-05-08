import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';

import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';

@Component({
  selector: 'app-plate-heatmap',
  templateUrl: './plate-heatmap.component.html',
  styleUrls: ['./plate-heatmap.component.scss'],
  encapsulation: ViewEncapsulation.Native
})

export class PlateHeatmapComponent implements OnInit {
  @ViewChild('chart') private chartContainer: ElementRef;


  df: Array<Object> = [
    { 'sample_id': 'TUL5', 'avg': 22.4791, 'indivs': [31.06754, 18.08720, 18.28256], 'row': "E", 'cols': [1, 2, 3] },
    { 'sample_id': 'TUL23', 'avg': 54.80144, 'indivs': [49.96560, 57.62928, 56.80943], 'row': "G", 'cols': [7, 8, 9] },
    { 'sample_id': 'TUL3', 'avg': 8.75909, 'indivs': [9.07368, 8.61540, 8.58819], 'row': "C", 'cols': [1, 2, 3] }
  ]

  df2: Array<Object> =
    [
      {
        "filename": "Specimen_001_A1_A01_001.fcs",
        "MFI_all": 60.4,
        "pct_fluor": 0.43,
        "MFI": 1993,
        "plate": 1,
        "well": "A1",
        "row": "A",
        "col": 1,
        "MFI_all_source": "beads/PerCP-Cy5-5-A, SSC-A subset | Geometric Mean (FITC-A)",
        "pct_fluor_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Freq. of Parent",
        "MFI_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Geometric Mean (FITC-A)",
        "sample_id": "TUL 1",
        "sample_type": "experiment sample",
        "experiment": "ADCD",
        "sample_dilution": "1:30 (1:10 of 1:3)",
        "cell_donor": null,
        "expt_id": "BMGEXP577",
        "fluor_score": 0.085699,
        "fluor_score_type": "phagocytotic score",
        "fluor_percentile": 5.7291666667,
        "sample_mean": 0.106549,
        "sample_std": 0.0210195023,
        "num_obs": 3
      }, {
        "filename": "Specimen_001_A2_A02_002.fcs",
        "MFI_all": 57.5,
        "pct_fluor": 0.61,
        "MFI": 2094,
        "plate": 1,
        "well": "A2",
        "row": "A",
        "col": 2,
        "MFI_all_source": "beads/PerCP-Cy5-5-A, SSC-A subset | Geometric Mean (FITC-A)",
        "pct_fluor_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Freq. of Parent",
        "MFI_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Geometric Mean (FITC-A)",
        "sample_id": "TUL 1",
        "sample_type": "experiment sample",
        "experiment": "ADCD",
        "sample_dilution": "1:30 (1:10 of 1:3)",
        "cell_donor": null,
        "expt_id": "BMGEXP577",
        "fluor_score": 0.127734,
        "fluor_score_type": "phagocytotic score",
        "fluor_percentile": 15.625,
        "sample_mean": 0.106549,
        "sample_std": 0.0210195023,
        "num_obs": 3
      }, {
        "filename": "Specimen_001_A3_A03_003.fcs",
        "MFI_all": 59.6,
        "pct_fluor": 0.46,
        "MFI": 2309,
        "plate": 1,
        "well": "A3",
        "row": "A",
        "col": 3,
        "MFI_all_source": "beads/PerCP-Cy5-5-A, SSC-A subset | Geometric Mean (FITC-A)",
        "pct_fluor_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Freq. of Parent",
        "MFI_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Geometric Mean (FITC-A)",
        "sample_id": "TUL 1",
        "sample_type": "experiment sample",
        "experiment": "ADCD",
        "sample_dilution": "1:30 (1:10 of 1:3)",
        "cell_donor": null,
        "expt_id": "BMGEXP577",
        "fluor_score": 0.106214,
        "fluor_score_type": "phagocytotic score",
        "fluor_percentile": 9.8958333333,
        "sample_mean": 0.106549,
        "sample_std": 0.0210195023,
        "num_obs": 3
      }, {
        "filename": "Specimen_001_A4_A04_004.fcs",
        "MFI_all": 1789,
        "pct_fluor": 90.6,
        "MFI": 2077,
        "plate": 1,
        "well": "A4",
        "row": "A",
        "col": 4,
        "MFI_all_source": "beads/PerCP-Cy5-5-A, SSC-A subset | Geometric Mean (FITC-A)",
        "pct_fluor_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Freq. of Parent",
        "MFI_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Geometric Mean (FITC-A)",
        "sample_id": "TUL 9",
        "sample_type": "experiment sample",
        "experiment": "ADCD",
        "sample_dilution": "1:30 (1:10 of 1:3)",
        "cell_donor": null,
        "expt_id": "BMGEXP577",
        "fluor_score": 18.81762,
        "fluor_score_type": "phagocytotic score",
        "fluor_percentile": 80.2083333333,
        "sample_mean": 17.5283,
        "sample_std": 1.2232905007,
        "num_obs": 3
      }, {
        "filename": "Specimen_001_A5_A05_005.fcs",
        "MFI_all": 1654,
        "pct_fluor": 88.6,
        "MFI": 1962,
        "plate": 1,
        "well": "A5",
        "row": "A",
        "col": 5,
        "MFI_all_source": "beads/PerCP-Cy5-5-A, SSC-A subset | Geometric Mean (FITC-A)",
        "pct_fluor_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Freq. of Parent",
        "MFI_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Geometric Mean (FITC-A)",
        "sample_id": "TUL 9",
        "sample_type": "experiment sample",
        "experiment": "ADCD",
        "sample_dilution": "1:30 (1:10 of 1:3)",
        "cell_donor": null,
        "expt_id": "BMGEXP577",
        "fluor_score": 17.38332,
        "fluor_score_type": "phagocytotic score",
        "fluor_percentile": 79.1666666667,
        "sample_mean": 17.5283,
        "sample_std": 1.2232905007,
        "num_obs": 3
      }, {
        "filename": "Specimen_001_A6_A06_006.fcs",
        "MFI_all": 1540,
        "pct_fluor": 85.2,
        "MFI": 1923,
        "plate": 1,
        "well": "A6",
        "row": "A",
        "col": 6,
        "MFI_all_source": "beads/PerCP-Cy5-5-A, SSC-A subset | Geometric Mean (FITC-A)",
        "pct_fluor_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Freq. of Parent",
        "MFI_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Geometric Mean (FITC-A)",
        "sample_id": "TUL 9",
        "sample_type": "experiment sample",
        "experiment": "ADCD",
        "sample_dilution": "1:30 (1:10 of 1:3)",
        "cell_donor": null,
        "expt_id": "BMGEXP577",
        "fluor_score": 16.38396,
        "fluor_score_type": "phagocytotic score",
        "fluor_percentile": 78.125,
        "sample_mean": 17.5283,
        "sample_std": 1.2232905007,
        "num_obs": 3
      }, {
        "filename": "Specimen_001_A7_A07_007.fcs",
        "MFI_all": 117,
        "pct_fluor": 1.86,
        "MFI": 1369,
        "plate": 1,
        "well": "A7",
        "row": "A",
        "col": 7,
        "MFI_all_source": "beads/PerCP-Cy5-5-A, SSC-A subset | Geometric Mean (FITC-A)",
        "pct_fluor_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Freq. of Parent",
        "MFI_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Geometric Mean (FITC-A)",
        "sample_id": "TUL 17",
        "sample_type": "experiment sample",
        "experiment": "ADCD",
        "sample_dilution": "1:30 (1:10 of 1:3)",
        "cell_donor": null,
        "expt_id": "BMGEXP577",
        "fluor_score": 0.254634,
        "fluor_score_type": "phagocytotic score",
        "fluor_percentile": 38.5416666667,
        "sample_mean": 0.2039643333,
        "sample_std": 0.0441300245,
        "num_obs": 3
      }, {
        "filename": "Specimen_001_A8_A08_008.fcs",
        "MFI_all": 111,
        "pct_fluor": 1.47,
        "MFI": 1247,
        "plate": 1,
        "well": "A8",
        "row": "A",
        "col": 8,
        "MFI_all_source": "beads/PerCP-Cy5-5-A, SSC-A subset | Geometric Mean (FITC-A)",
        "pct_fluor_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Freq. of Parent",
        "MFI_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Geometric Mean (FITC-A)",
        "sample_id": "TUL 17",
        "sample_type": "experiment sample",
        "experiment": "ADCD",
        "sample_dilution": "1:30 (1:10 of 1:3)",
        "cell_donor": null,
        "expt_id": "BMGEXP577",
        "fluor_score": 0.183309,
        "fluor_score_type": "phagocytotic score",
        "fluor_percentile": 28.125,
        "sample_mean": 0.2039643333,
        "sample_std": 0.0441300245,
        "num_obs": 3
      }, {
        "filename": "Specimen_001_A9_A09_009.fcs",
        "MFI_all": 113,
        "pct_fluor": 1.42,
        "MFI": 1225,
        "plate": 1,
        "well": "A9",
        "row": "A",
        "col": 9,
        "MFI_all_source": "beads/PerCP-Cy5-5-A, SSC-A subset | Geometric Mean (FITC-A)",
        "pct_fluor_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Freq. of Parent",
        "MFI_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Geometric Mean (FITC-A)",
        "sample_id": "TUL 17",
        "sample_type": "experiment sample",
        "experiment": "ADCD",
        "sample_dilution": "1:30 (1:10 of 1:3)",
        "cell_donor": null,
        "expt_id": "BMGEXP577",
        "fluor_score": 0.17395,
        "fluor_score_type": "phagocytotic score",
        "fluor_percentile": 25.5208333333,
        "sample_mean": 0.2039643333,
        "sample_std": 0.0441300245,
        "num_obs": 3
      }, {
        "filename": "Specimen_001_A10_A10_010.fcs",
        "MFI_all": 277,
        "pct_fluor": 16,
        "MFI": 736,
        "plate": 1,
        "well": "A10",
        "row": "A",
        "col": 10,
        "MFI_all_source": "beads/PerCP-Cy5-5-A, SSC-A subset | Geometric Mean (FITC-A)",
        "pct_fluor_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Freq. of Parent",
        "MFI_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Geometric Mean (FITC-A)",
        "sample_id": "TUL 25",
        "sample_type": "experiment sample",
        "experiment": "ADCD",
        "sample_dilution": "1:30 (1:10 of 1:3)",
        "cell_donor": null,
        "expt_id": "BMGEXP577",
        "fluor_score": 1.1776,
        "fluor_score_type": "phagocytotic score",
        "fluor_percentile": 56.7708333333,
        "sample_mean": 1.1555666667,
        "sample_std": 0.1160790715,
        "num_obs": 3
      }, {
        "filename": "Specimen_001_A11_A11_011.fcs",
        "MFI_all": 287,
        "pct_fluor": 16.9,
        "MFI": 745,
        "plate": 1,
        "well": "A11",
        "row": "A",
        "col": 11,
        "MFI_all_source": "beads/PerCP-Cy5-5-A, SSC-A subset | Geometric Mean (FITC-A)",
        "pct_fluor_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Freq. of Parent",
        "MFI_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Geometric Mean (FITC-A)",
        "sample_id": "TUL 25",
        "sample_type": "experiment sample",
        "experiment": "ADCD",
        "sample_dilution": "1:30 (1:10 of 1:3)",
        "cell_donor": null,
        "expt_id": "BMGEXP577",
        "fluor_score": 1.25905,
        "fluor_score_type": "phagocytotic score",
        "fluor_percentile": 58.3333333333,
        "sample_mean": 1.1555666667,
        "sample_std": 0.1160790715,
        "num_obs": 3
      }, {
        "filename": "Specimen_001_A12_A12_012.fcs",
        "MFI_all": 253,
        "pct_fluor": 13.5,
        "MFI": 763,
        "plate": 1,
        "well": "A12",
        "row": "A",
        "col": 12,
        "MFI_all_source": "beads/PerCP-Cy5-5-A, SSC-A subset | Geometric Mean (FITC-A)",
        "pct_fluor_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Freq. of Parent",
        "MFI_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Geometric Mean (FITC-A)",
        "sample_id": "TUL 25",
        "sample_type": "experiment sample",
        "experiment": "ADCD",
        "sample_dilution": "1:30 (1:10 of 1:3)",
        "cell_donor": null,
        "expt_id": "BMGEXP577",
        "fluor_score": 1.03005,
        "fluor_score_type": "phagocytotic score",
        "fluor_percentile": 54.1666666667,
        "sample_mean": 1.1555666667,
        "sample_std": 0.1160790715,
        "num_obs": 3
      }, {
        "filename": "Specimen_001_B1_B01_013.fcs",
        "MFI_all": 96,
        "pct_fluor": 1.02,
        "MFI": 815,
        "plate": 1,
        "well": "B1",
        "row": "B",
        "col": 1,
        "MFI_all_source": "beads/PerCP-Cy5-5-A, SSC-A subset | Geometric Mean (FITC-A)",
        "pct_fluor_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Freq. of Parent",
        "MFI_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Geometric Mean (FITC-A)",
        "sample_id": "TUL 2",
        "sample_type": "experiment sample",
        "experiment": "ADCD",
        "sample_dilution": "1:30 (1:10 of 1:3)",
        "cell_donor": null,
        "expt_id": "BMGEXP577",
        "fluor_score": 0.08313,
        "fluor_score_type": "phagocytotic score",
        "fluor_percentile": 4.6875,
        "sample_mean": 0.0950673333,
        "sample_std": 0.0146046158,
        "num_obs": 3
      }, {
        "filename": "Specimen_001_B2_B02_014.fcs",
        "MFI_all": 97.6,
        "pct_fluor": 1.24,
        "MFI": 898,
        "plate": 1,
        "well": "B2",
        "row": "B",
        "col": 2,
        "MFI_all_source": "beads/PerCP-Cy5-5-A, SSC-A subset | Geometric Mean (FITC-A)",
        "pct_fluor_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Freq. of Parent",
        "MFI_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Geometric Mean (FITC-A)",
        "sample_id": "TUL 2",
        "sample_type": "experiment sample",
        "experiment": "ADCD",
        "sample_dilution": "1:30 (1:10 of 1:3)",
        "cell_donor": null,
        "expt_id": "BMGEXP577",
        "fluor_score": 0.111352,
        "fluor_score_type": "phagocytotic score",
        "fluor_percentile": 10.9375,
        "sample_mean": 0.0950673333,
        "sample_std": 0.0146046158,
        "num_obs": 3
      }, {
        "filename": "Specimen_001_B3_B03_015.fcs",
        "MFI_all": 101,
        "pct_fluor": 1.08,
        "MFI": 840,
        "plate": 1,
        "well": "B3",
        "row": "B",
        "col": 3,
        "MFI_all_source": "beads/PerCP-Cy5-5-A, SSC-A subset | Geometric Mean (FITC-A)",
        "pct_fluor_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Freq. of Parent",
        "MFI_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Geometric Mean (FITC-A)",
        "sample_id": "TUL 2",
        "sample_type": "experiment sample",
        "experiment": "ADCD",
        "sample_dilution": "1:30 (1:10 of 1:3)",
        "cell_donor": null,
        "expt_id": "BMGEXP577",
        "fluor_score": 0.09072,
        "fluor_score_type": "phagocytotic score",
        "fluor_percentile": 7.2916666667,
        "sample_mean": 0.0950673333,
        "sample_std": 0.0146046158,
        "num_obs": 3
      }, {
        "filename": "Specimen_001_B4_B04_016.fcs",
        "MFI_all": 1260,
        "pct_fluor": 83.5,
        "MFI": 1574,
        "plate": 1,
        "well": "B4",
        "row": "B",
        "col": 4,
        "MFI_all_source": "beads/PerCP-Cy5-5-A, SSC-A subset | Geometric Mean (FITC-A)",
        "pct_fluor_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Freq. of Parent",
        "MFI_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Geometric Mean (FITC-A)",
        "sample_id": "TUL 10",
        "sample_type": "experiment sample",
        "experiment": "ADCD",
        "sample_dilution": "1:30 (1:10 of 1:3)",
        "cell_donor": null,
        "expt_id": "BMGEXP577",
        "fluor_score": 13.1429,
        "fluor_score_type": "phagocytotic score",
        "fluor_percentile": 75,
        "sample_mean": 14.0355866667,
        "sample_std": 0.8877911773,
        "num_obs": 3
      }, {
        "filename": "Specimen_001_B5_B05_017.fcs",
        "MFI_all": 1361,
        "pct_fluor": 85.8,
        "MFI": 1637,
        "plate": 1,
        "well": "B5",
        "row": "B",
        "col": 5,
        "MFI_all_source": "beads/PerCP-Cy5-5-A, SSC-A subset | Geometric Mean (FITC-A)",
        "pct_fluor_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Freq. of Parent",
        "MFI_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Geometric Mean (FITC-A)",
        "sample_id": "TUL 10",
        "sample_type": "experiment sample",
        "experiment": "ADCD",
        "sample_dilution": "1:30 (1:10 of 1:3)",
        "cell_donor": null,
        "expt_id": "BMGEXP577",
        "fluor_score": 14.04546,
        "fluor_score_type": "phagocytotic score",
        "fluor_percentile": 76.0416666667,
        "sample_mean": 14.0355866667,
        "sample_std": 0.8877911773,
        "num_obs": 3
      }, {
        "filename": "Specimen_001_B6_B06_018.fcs",
        "MFI_all": 1447,
        "pct_fluor": 88.8,
        "MFI": 1680,
        "plate": 1,
        "well": "B6",
        "row": "B",
        "col": 6,
        "MFI_all_source": "beads/PerCP-Cy5-5-A, SSC-A subset | Geometric Mean (FITC-A)",
        "pct_fluor_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Freq. of Parent",
        "MFI_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Geometric Mean (FITC-A)",
        "sample_id": "TUL 10",
        "sample_type": "experiment sample",
        "experiment": "ADCD",
        "sample_dilution": "1:30 (1:10 of 1:3)",
        "cell_donor": null,
        "expt_id": "BMGEXP577",
        "fluor_score": 14.9184,
        "fluor_score_type": "phagocytotic score",
        "fluor_percentile": 77.6041666667,
        "sample_mean": 14.0355866667,
        "sample_std": 0.8877911773,
        "num_obs": 3
      }, {
        "filename": "Specimen_001_B7_B07_019.fcs",
        "MFI_all": 95.8,
        "pct_fluor": 1.24,
        "MFI": 1030,
        "plate": 1,
        "well": "B7",
        "row": "B",
        "col": 7,
        "MFI_all_source": "beads/PerCP-Cy5-5-A, SSC-A subset | Geometric Mean (FITC-A)",
        "pct_fluor_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Freq. of Parent",
        "MFI_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Geometric Mean (FITC-A)",
        "sample_id": "TUL 18",
        "sample_type": "experiment sample",
        "experiment": "ADCD",
        "sample_dilution": "1:30 (1:10 of 1:3)",
        "cell_donor": null,
        "expt_id": "BMGEXP577",
        "fluor_score": 0.12772,
        "fluor_score_type": "phagocytotic score",
        "fluor_percentile": 15.1041666667,
        "sample_mean": 0.0912053333,
        "sample_std": 0.0324081336,
        "num_obs": 3
      }, {
        "filename": "Specimen_001_B8_B08_020.fcs",
        "MFI_all": 91.1,
        "pct_fluor": 0.92,
        "MFI": 870,
        "plate": 1,
        "well": "B8",
        "row": "B",
        "col": 8,
        "MFI_all_source": "beads/PerCP-Cy5-5-A, SSC-A subset | Geometric Mean (FITC-A)",
        "pct_fluor_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Freq. of Parent",
        "MFI_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Geometric Mean (FITC-A)",
        "sample_id": "TUL 18",
        "sample_type": "experiment sample",
        "experiment": "ADCD",
        "sample_dilution": "1:30 (1:10 of 1:3)",
        "cell_donor": null,
        "expt_id": "BMGEXP577",
        "fluor_score": 0.08004,
        "fluor_score_type": "phagocytotic score",
        "fluor_percentile": 3.125,
        "sample_mean": 0.0912053333,
        "sample_std": 0.0324081336,
        "num_obs": 3
      }, {
        "filename": "Specimen_001_B9_B09_021.fcs",
        "MFI_all": 87.6,
        "pct_fluor": 0.64,
        "MFI": 1029,
        "plate": 1,
        "well": "B9",
        "row": "B",
        "col": 9,
        "MFI_all_source": "beads/PerCP-Cy5-5-A, SSC-A subset | Geometric Mean (FITC-A)",
        "pct_fluor_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Freq. of Parent",
        "MFI_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Geometric Mean (FITC-A)",
        "sample_id": "TUL 18",
        "sample_type": "experiment sample",
        "experiment": "ADCD",
        "sample_dilution": "1:30 (1:10 of 1:3)",
        "cell_donor": null,
        "expt_id": "BMGEXP577",
        "fluor_score": 0.065856,
        "fluor_score_type": "phagocytotic score",
        "fluor_percentile": 2.0833333333,
        "sample_mean": 0.0912053333,
        "sample_std": 0.0324081336,
        "num_obs": 3
      }, {
        "filename": "Specimen_001_B10_B10_022.fcs",
        "MFI_all": 1417,
        "pct_fluor": 90.1,
        "MFI": 1613,
        "plate": 1,
        "well": "B10",
        "row": "B",
        "col": 10,
        "MFI_all_source": "beads/PerCP-Cy5-5-A, SSC-A subset | Geometric Mean (FITC-A)",
        "pct_fluor_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Freq. of Parent",
        "MFI_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Geometric Mean (FITC-A)",
        "sample_id": "TUL 26",
        "sample_type": "experiment sample",
        "experiment": "ADCD",
        "sample_dilution": "1:30 (1:10 of 1:3)",
        "cell_donor": null,
        "expt_id": "BMGEXP577",
        "fluor_score": 14.53313,
        "fluor_score_type": "phagocytotic score",
        "fluor_percentile": 76.5625,
        "sample_mean": 14.1676566667,
        "sample_std": 0.9414772915,
        "num_obs": 3
      }, {
        "filename": "Specimen_001_B11_B11_023.fcs",
        "MFI_all": 1463,
        "pct_fluor": 91.8,
        "MFI": 1620,
        "plate": 1,
        "well": "B11",
        "row": "B",
        "col": 11,
        "MFI_all_source": "beads/PerCP-Cy5-5-A, SSC-A subset | Geometric Mean (FITC-A)",
        "pct_fluor_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Freq. of Parent",
        "MFI_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Geometric Mean (FITC-A)",
        "sample_id": "TUL 26",
        "sample_type": "experiment sample",
        "experiment": "ADCD",
        "sample_dilution": "1:30 (1:10 of 1:3)",
        "cell_donor": null,
        "expt_id": "BMGEXP577",
        "fluor_score": 14.8716,
        "fluor_score_type": "phagocytotic score",
        "fluor_percentile": 77.0833333333,
        "sample_mean": 14.1676566667,
        "sample_std": 0.9414772915,
        "num_obs": 3
      }, {
        "filename": "Specimen_001_B12_B12_024.fcs",
        "MFI_all": 1290,
        "pct_fluor": 86.4,
        "MFI": 1516,
        "plate": 1,
        "well": "B12",
        "row": "B",
        "col": 12,
        "MFI_all_source": "beads/PerCP-Cy5-5-A, SSC-A subset | Geometric Mean (FITC-A)",
        "pct_fluor_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Freq. of Parent",
        "MFI_source": "beads/PerCP-Cy5-5-A, SSC-A subset/FITC-A subset | Geometric Mean (FITC-A)",
        "sample_id": "TUL 26",
        "sample_type": "experiment sample",
        "experiment": "ADCD",
        "sample_dilution": "1:30 (1:10 of 1:3)",
        "cell_donor": null,
        "expt_id": "BMGEXP577",
        "fluor_score": 13.09824,
        "fluor_score_type": "phagocytotic score",
        "fluor_percentile": 74.4791666667,
        "sample_mean": 14.1676566667,
        "sample_std": 0.9414772915,
        "num_obs": 3
      }
  ];



  plates: Array<number> = [1,2];

  // --- Plot sizing ---
  private element: any;
  private element_dims: any;
  private margin: any = { top: 50, bottom: 0, left: 50, right: 50 };
  private width: number;
  private height: number;
  private rect_width: number;

  // --- Selectors ---
  private heatmap: any;
  private grp1: any;

  // --- Scales ---
  private y: any;

  private colorScale = d3.scaleSequential(d3Chromatic.interpolateYlGn).domain([0, 200]);

  constructor() { }

  ngOnInit() {
    // this.df = this.df.sort((a, b) => a.avg - b.avg);

    //
    // this.fluorcts = [
    //   {
    //     'row': 'A', 'fluor': [
    //       { 'cts': 100, 'fill': this.colorScale(100), 'color': 'black' },
    //       { 'cts': 200, 'fill': this.colorScale(200), 'color': 'black' },
    //       { 'cts': 300, 'fill': this.colorScale(300), 'color': 'black' }]
    //   },
    //   {
    //     'row': 'B', 'fluor': [
    //       { 'cts': 400, 'fill': this.colorScale(400), 'color': 'white' },
    //       { 'cts': 500, 'fill': this.colorScale(500), 'color': 'white' },
    //       { 'cts': 600, 'fill': this.colorScale(600), 'color': 'white' }]
    //   }
    // ];
    //
    // console.log(this.fluorcts)

    this.createChart();
    this.changeChart();

  }


  getSVGDims() {
    // Find container; define width/height of svg obj.
    this.element = this.chartContainer.nativeElement;
    this.element_dims = this.element.getBoundingClientRect();
    this.width = this.element.offsetWidth / 2 - this.margin.left - this.margin.right;
    this.height = this.element.offsetHeight - this.margin.top - this.margin.bottom;
  }

  changeChart() {
    // console.log('changing')
          this.grp1.transition().delay(1300).duration(2000).attr('y', 0)
  }

  // Data-independent setup
  createChart() {
    this.getSVGDims();

    this.rect_width = this.width / this.df.length;

    this.y = d3.scaleLinear().range([this.height, 0]).domain([0, 150]);

    // Append SVG
    const svg = d3.select(this.element)
      .append('svg')
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom);

    // selectors
    this.heatmap = svg.append("g")
      .attr("id", "heatmap")
      .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);

        this.grp1 = this.heatmap.selectAll('.avg')
          .data(this.df2)
          .enter().append('g');

            this.grp1 = this.grp1
              .append('rect')
              .attr('class', '.avg-heatmap')
              .attr('x', (d, i) => i * this.rect_width)
              .attr('width', this.rect_width)
              .attr('y', this.height / 3)
              .attr('height', this.height / 3 * 2)
              .style('fill', d => this.colorScale(d.fluor_score));



// NESTED VERSION
  //   let grp1 = this.heatmap.selectAll('.avg')
  //     .data(this.df)
  //     .enter().append('g');
  //
  //   // TODO: fix sizes for width/height
  //   // Avg heatmap
  //   grp1
  //     .append('rect')
  //     .attr('class', '.avg-heatmap')
  //     .attr('x', (d, i) => i * this.rect_width)
  //     .attr('width', this.rect_width)
  //     .attr('y', this.height / 3)
  //     .attr('height', this.height / 3 * 2)
  //     .style('fill', d => this.colorScale(d.avg))
  //
  //   // Avg label
  //   grp1.append('text')
  //     .attr('class', 'annotation avg-label')
  //     .attr('x', (d, i) => i * this.rect_width + this.rect_width / 2)
  //     .attr('y', this.height / 3 * 2)
  //     .text(d => d3.format("(.1f")(d.avg));
  //
  //   // individual heatmap -- fade
  //   grp1.append("g")
  //     .attr('class', 'indiv-grp')
  //     .attr('transform', (d, i) => 'translate(' + this.rect_width * i + ',0)')
  //     .selectAll('.indiv-heatmap')
  //     .data(d => d.indivs)
  //     .enter().append('rect')
  //     .attr('class', 'indiv-heatmap')
  //     .attr('x', (d, i) => i * this.rect_width / 3)
  //     .attr('width', this.rect_width / 3)
  //     .attr('y', 0)
  //     .attr('height', this.height)
  //     .style('fill', d => this.colorScale(d))
  //     .transition('fade')
  //     .delay(2000)
  //     .duration(500)
  //     // .attr('height', this.height/3)
  //     .style('opacity', 0)
  //
  //   // inidividual heatmap:
  //   grp1.append("g")
  //     .attr('class', 'indiv-grp')
  //     .attr('transform', (d, i) => 'translate(' + this.rect_width * i + ',0)')
  //     .selectAll('.indiv-heatmap')
  //     .data(d => d.indivs)
  //     .enter().append('rect')
  //     .attr('class', 'indiv-heatmap')
  //     .attr('x', (d, i) => i * this.rect_width / 3)
  //     .attr('width', this.rect_width / 3)
  //     .attr('y', 0)
  //     .attr('height', this.height / 3)
  //     .style('fill', d => this.colorScale(d))
  //
  //   // inidividual heatmap labels:
  //   grp1.append("g")
  //     .attr('class', 'indiv-grp')
  //     .attr('transform', (d, i) => 'translate(' + this.rect_width * i + ',0)')
  //     .selectAll('.indiv-label')
  //     .data(d => d.indivs)
  //     .enter().append('text')
  //     .attr('class', 'annotation indiv-label')
  //     .attr('x', (d, i) => i * this.rect_width / 3 + this.rect_width / 6)
  //     .attr('y', this.rect_width / 6)
  //     .text((d, i) => "A" + i);
  // }


}
