"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Meeting = {
  slug: string;
  date: string;
  label: string;
  going: string;
  races: number;
  courseSlug: string;
  latest?: boolean;
};

const MEETINGS: any[] = [
  {
    slug:       "leopardstown_4-june-2026",
    date:       "4 June 2026",
    label:      "Leopardstown — 4 June 2026",
    going:      "Good To Soft",
    races:      7,
    courseSlug: "leopardstown",
    latest:     true,
  },
  {
    slug:       "hamilton_4-june-2026",
    date:       "4 June 2026",
    label:      "Hamilton — 4 June 2026",
    going:      "Good",
    races:      7,
    courseSlug: "hamilton",
    latest:     false,
  },
  {
    slug:       "ffos_las_4-june-2026",
    date:       "4 June 2026",
    label:      "Ffos Las — 4 June 2026",
    going:      "Good",
    races:      6,
    courseSlug: "ffos-las",
    latest:     false,
  },
  {
    slug:       "warwick_3-june-2026",
    date:       "3 June 2026",
    label:      "Warwick — 3 June 2026",
    going:      "Good",
    races:      6,
    courseSlug: "warwick",
    latest:     false,
  },
  {
    slug:       "ripon_3-june-2026",
    date:       "3 June 2026",
    label:      "Ripon — 3 June 2026",
    going:      "Soft",
    races:      6,
    courseSlug: "ripon",
    latest:     false,
  },
  {
    slug:       "nottingham_3-june-2026",
    date:       "3 June 2026",
    label:      "Nottingham — 3 June 2026",
    going:      "Good",
    races:      6,
    courseSlug: "nottingham",
    latest:     false,
  },
  {
    slug:       "newton_abbot_3-june-2026",
    date:       "3 June 2026",
    label:      "Newton Abbot — 3 June 2026",
    going:      "Good",
    races:      7,
    courseSlug: "newton-abbot",
    latest:     false,
  },
  {
    slug:       "curragh_3-june-2026",
    date:       "3 June 2026",
    label:      "Curragh — 3 June 2026",
    going:      "Good To Soft",
    races:      8,
    courseSlug: "curragh",
    latest:     false,
  },
  {
    slug:       "wolverhampton_aw_2-june-2026",
    date:       "2 June 2026",
    label:      "Wolverhampton (AW) — 2 June 2026",
    going:      "Standard",
    races:      8,
    courseSlug: "wolverhampton-aw",
    latest:     false,
  },
  {
    slug:       "southwell_2-june-2026",
    date:       "2 June 2026",
    label:      "Southwell — 2 June 2026",
    going:      "Standard",
    races:      7,
    courseSlug: "southwell",
    latest:     false,
  },
  {
    slug:       "pontefract_2-june-2026",
    date:       "2 June 2026",
    label:      "Pontefract — 2 June 2026",
    going:      "Good",
    races:      6,
    courseSlug: "pontefract",
    latest:     false,
  },
  {
    slug:       "newcastle_aw_2-june-2026",
    date:       "2 June 2026",
    label:      "Newcastle (AW) — 2 June 2026",
    going:      "Standard",
    races:      6,
    courseSlug: "newcastle-aw",
    latest:     false,
  },
  {
    slug:       "wolverhampton_aw_1-june-2026",
    date:       "1 June 2026",
    label:      "Wolverhampton (AW) — 1 June 2026",
    going:      "Standard",
    races:      7,
    courseSlug: "wolverhampton-aw",
    latest:     false,
  },
  {
    slug:       "windsor_1-june-2026",
    date:       "1 June 2026",
    label:      "Windsor — 1 June 2026",
    going:      "Good",
    races:      8,
    courseSlug: "windsor",
    latest:     false,
  },
  {
    slug:       "newbury_1-june-2026",
    date:       "1 June 2026",
    label:      "Newbury — 1 June 2026",
    going:      "Good",
    races:      6,
    courseSlug: "newbury",
    latest:     false,
  },
  {
    slug:       "listowel_1-june-2026",
    date:       "1 June 2026",
    label:      "Listowel — 1 June 2026",
    going:      "Good",
    races:      7,
    courseSlug: "listowel",
    latest:     false,
  },
  {
    slug:       "lingfield_aw_1-june-2026",
    date:       "1 June 2026",
    label:      "Lingfield (AW) — 1 June 2026",
    going:      "Standard",
    races:      3,
    courseSlug: "lingfield-aw",
    latest:     false,
  },
  {
    slug:       "lingfield_1-june-2026",
    date:       "1 June 2026",
    label:      "Lingfield — 1 June 2026",
    going:      "Standard",
    races:      3,
    courseSlug: "lingfield",
    latest:     false,
  },
  {
    slug:       "gowran_park_1-june-2026",
    date:       "1 June 2026",
    label:      "Gowran Park — 1 June 2026",
    going:      "Good",
    races:      8,
    courseSlug: "gowran-park",
    latest:     false,
  },
  {
    slug:       "thirsk_31-may-2026",
    date:       "31 May 2026",
    label:      "Thirsk — 31 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "thirsk",
    latest:     false,
  },
  {
    slug:       "nottingham_31-may-2026",
    date:       "31 May 2026",
    label:      "Nottingham — 31 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "nottingham",
    latest:     false,
  },
  {
    slug:       "listowel_31-may-2026",
    date:       "31 May 2026",
    label:      "Listowel — 31 May 2026",
    going:      "Good To Soft",
    races:      7,
    courseSlug: "listowel",
    latest:     false,
  },
  {
    slug:       "kilbeggan_31-may-2026",
    date:       "31 May 2026",
    label:      "Kilbeggan — 31 May 2026",
    going:      "Good To Soft",
    races:      7,
    courseSlug: "kilbeggan",
    latest:     false,
  },
  {
    slug:       "fakenham_31-may-2026",
    date:       "31 May 2026",
    label:      "Fakenham — 31 May 2026",
    going:      "Good",
    races:      6,
    courseSlug: "fakenham",
    latest:     false,
  },
  {
    slug:       "tramore_30-may-2026",
    date:       "30 May 2026",
    label:      "Tramore — 30 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "tramore",
    latest:     false,
  },
  {
    slug:       "stratford_30-may-2026",
    date:       "30 May 2026",
    label:      "Stratford — 30 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "stratford",
    latest:     false,
  },
  {
    slug:       "listowel_30-may-2026",
    date:       "30 May 2026",
    label:      "Listowel — 30 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "listowel",
    latest:     false,
  },
  {
    slug:       "lingfield_30-may-2026",
    date:       "30 May 2026",
    label:      "Lingfield — 30 May 2026",
    going:      "Standard",
    races:      7,
    courseSlug: "lingfield",
    latest:     false,
  },
  {
    slug:       "chester_30-may-2026",
    date:       "30 May 2026",
    label:      "Chester — 30 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "chester",
    latest:     false,
  },
  {
    slug:       "catterick_30-may-2026",
    date:       "30 May 2026",
    label:      "Catterick — 30 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "catterick",
    latest:     false,
  },
  {
    slug:       "carlisle_30-may-2026",
    date:       "30 May 2026",
    label:      "Carlisle — 30 May 2026",
    going:      "Good",
    races:      8,
    courseSlug: "carlisle",
    latest:     false,
  },
  {
    slug:       "beverley_30-may-2026",
    date:       "30 May 2026",
    label:      "Beverley — 30 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "beverley",
    latest:     false,
  },
  {
    slug:       "wolverhampton_aw_29-may-2026",
    date:       "29 May 2026",
    label:      "Wolverhampton (AW) — 29 May 2026",
    going:      "Standard",
    races:      6,
    courseSlug: "wolverhampton-aw",
    latest:     false,
  },
  {
    slug:       "tramore_29-may-2026",
    date:       "29 May 2026",
    label:      "Tramore — 29 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "tramore",
    latest:     false,
  },
  {
    slug:       "down_royal_29-may-2026",
    date:       "29 May 2026",
    label:      "Down Royal — 29 May 2026",
    going:      "Good",
    races:      8,
    courseSlug: "down-royal",
    latest:     false,
  },
  {
    slug:       "chepstow_29-may-2026",
    date:       "29 May 2026",
    label:      "Chepstow — 29 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "chepstow",
    latest:     false,
  },
  {
    slug:       "carlisle_29-may-2026",
    date:       "29 May 2026",
    label:      "Carlisle — 29 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "carlisle",
    latest:     false,
  },
  {
    slug:       "brighton_29-may-2026",
    date:       "29 May 2026",
    label:      "Brighton — 29 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "brighton",
    latest:     false,
  },
  {
    slug:       "yarmouth_28-may-2026",
    date:       "28 May 2026",
    label:      "Yarmouth — 28 May 2026",
    going:      "Good",
    races:      6,
    courseSlug: "yarmouth",
    latest:     false,
  },
  {
    slug:       "worcester_28-may-2026",
    date:       "28 May 2026",
    label:      "Worcester — 28 May 2026",
    going:      "Good",
    races:      6,
    courseSlug: "worcester",
    latest:     false,
  },
  {
    slug:       "sandown_28-may-2026",
    date:       "28 May 2026",
    label:      "Sandown — 28 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "sandown",
    latest:     false,
  },
  {
    slug:       "ripon_28-may-2026",
    date:       "28 May 2026",
    label:      "Ripon — 28 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "ripon",
    latest:     false,
  },
  {
    slug:       "market_rasen_28-may-2026",
    date:       "28 May 2026",
    label:      "Market Rasen — 28 May 2026",
    going:      "Good",
    races:      6,
    courseSlug: "market-rasen",
    latest:     false,
  },
  {
    slug:       "limerick_28-may-2026",
    date:       "28 May 2026",
    label:      "Limerick — 28 May 2026",
    going:      "Good",
    races:      8,
    courseSlug: "limerick",
    latest:     false,
  },
  {
    slug:       "fairyhouse_28-may-2026",
    date:       "28 May 2026",
    label:      "Fairyhouse — 28 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "fairyhouse",
    latest:     false,
  },
  {
    slug:       "newton_abbot_27-may-2026",
    date:       "27 May 2026",
    label:      "Newton Abbot — 27 May 2026",
    going:      "Good",
    races:      6,
    courseSlug: "newton-abbot",
    latest:     false,
  },
  {
    slug:       "kempton_aw_27-may-2026",
    date:       "27 May 2026",
    label:      "Kempton (AW) — 27 May 2026",
    going:      "Standard",
    races:      8,
    courseSlug: "kempton-aw",
    latest:     false,
  },
  {
    slug:       "hamilton_27-may-2026",
    date:       "27 May 2026",
    label:      "Hamilton — 27 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "hamilton",
    latest:     false,
  },
  {
    slug:       "cartmel_27-may-2026",
    date:       "27 May 2026",
    label:      "Cartmel — 27 May 2026",
    going:      "Good",
    races:      6,
    courseSlug: "cartmel",
    latest:     false,
  },
  {
    slug:       "beverley_27-may-2026",
    date:       "27 May 2026",
    label:      "Beverley — 27 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "beverley",
    latest:     false,
  },
  {
    slug:       "yarmouth_20-may-2026",
    date:       "20 May 2026",
    label:      "Yarmouth — 20 May 2026",
    going:      "Soft",
    races:      6,
    courseSlug: "yarmouth",
    latest:     false,
  },
  {
    slug:       "warwick_20-may-2026",
    date:       "20 May 2026",
    label:      "Warwick — 20 May 2026",
    going:      "Good",
    races:      6,
    courseSlug: "warwick",
    latest:     false,
  },
  {
    slug:       "kempton_aw_20-may-2026",
    date:       "20 May 2026",
    label:      "Kempton (AW) — 20 May 2026",
    going:      "Standard",
    races:      8,
    courseSlug: "kempton-aw",
    latest:     false,
  },
  {
    slug:       "gowran_park_20-may-2026",
    date:       "20 May 2026",
    label:      "Gowran Park — 20 May 2026",
    going:      "Good To Soft",
    races:      7,
    courseSlug: "gowran-park",
    latest:     false,
  },
  {
    slug:       "ffos_las_20-may-2026",
    date:       "20 May 2026",
    label:      "Ffos Las — 20 May 2026",
    going:      "Soft",
    races:      6,
    courseSlug: "ffos-las",
    latest:     false,
  },
  {
    slug:       "ayr_20-may-2026",
    date:       "20 May 2026",
    label:      "Ayr — 20 May 2026",
    going:      "Good",
    races:      8,
    courseSlug: "ayr",
    latest:     false,
  },
  {
    slug:       "nottingham_19-may-2026",
    date:       "19 May 2026",
    label:      "Nottingham — 19 May 2026",
    going:      "Good",
    races:      6,
    courseSlug: "nottingham",
    latest:     false,
  },
  {
    slug:       "newcastle_aw_19-may-2026",
    date:       "19 May 2026",
    label:      "Newcastle (AW) — 19 May 2026",
    going:      "Standard",
    races:      7,
    courseSlug: "newcastle-aw",
    latest:     false,
  },
  {
    slug:       "lingfield_19-may-2026",
    date:       "19 May 2026",
    label:      "Lingfield — 19 May 2026",
    going:      "Standard",
    races:      8,
    courseSlug: "lingfield",
    latest:     false,
  },
  {
    slug:       "huntingdon_19-may-2026",
    date:       "19 May 2026",
    label:      "Huntingdon — 19 May 2026",
    going:      "Good",
    races:      6,
    courseSlug: "huntingdon",
    latest:     false,
  },
  {
    slug:       "hexham_19-may-2026",
    date:       "19 May 2026",
    label:      "Hexham — 19 May 2026",
    going:      "Soft",
    races:      7,
    courseSlug: "hexham",
    latest:     false,
  },
  {
    slug:       "cork_19-may-2026",
    date:       "19 May 2026",
    label:      "Cork — 19 May 2026",
    going:      "Good To Soft",
    races:      8,
    courseSlug: "cork",
    latest:     false,
  },
  {
    slug:       "wolverhampton_aw_18-may-2026",
    date:       "18 May 2026",
    label:      "Wolverhampton (AW) — 18 May 2026",
    going:      "Standard",
    races:      7,
    courseSlug: "wolverhampton-aw",
    latest:     false,
  },
  {
    slug:       "windsor_18-may-2026",
    date:       "18 May 2026",
    label:      "Windsor — 18 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "windsor",
    latest:     false,
  },
  {
    slug:       "roscommon_18-may-2026",
    date:       "18 May 2026",
    label:      "Roscommon — 18 May 2026",
    going:      "Good",
    races:      8,
    courseSlug: "roscommon",
    latest:     false,
  },
  {
    slug:       "redcar_18-may-2026",
    date:       "18 May 2026",
    label:      "Redcar — 18 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "redcar",
    latest:     false,
  },
  {
    slug:       "lingfield_18-may-2026",
    date:       "18 May 2026",
    label:      "Lingfield — 18 May 2026",
    going:      "Standard",
    races:      6,
    courseSlug: "lingfield",
    latest:     false,
  },
  {
    slug:       "carlisle_18-may-2026",
    date:       "18 May 2026",
    label:      "Carlisle — 18 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "carlisle",
    latest:     false,
  },
  {
    slug:       "stratford_17-may-2026",
    date:       "17 May 2026",
    label:      "Stratford — 17 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "stratford",
    latest:     false,
  },
  {
    slug:       "ripon_17-may-2026",
    date:       "17 May 2026",
    label:      "Ripon — 17 May 2026",
    going:      "Good",
    races:      8,
    courseSlug: "ripon",
    latest:     false,
  },
  {
    slug:       "naas_17-may-2026",
    date:       "17 May 2026",
    label:      "Naas — 17 May 2026",
    going:      "Good",
    races:      8,
    courseSlug: "naas",
    latest:     false,
  },
  {
    slug:       "hamilton_17-may-2026",
    date:       "17 May 2026",
    label:      "Hamilton — 17 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "hamilton",
    latest:     false,
  },
  {
    slug:       "wexford_16-may-2026",
    date:       "16 May 2026",
    label:      "Wexford — 16 May 2026",
    going:      "Good To Soft",
    races:      8,
    courseSlug: "wexford",
    latest:     false,
  },
  {
    slug:       "uttoxeter_16-may-2026",
    date:       "16 May 2026",
    label:      "Uttoxeter — 16 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "uttoxeter",
    latest:     false,
  },
  {
    slug:       "thirsk_16-may-2026",
    date:       "16 May 2026",
    label:      "Thirsk — 16 May 2026",
    going:      "Good",
    races:      8,
    courseSlug: "thirsk",
    latest:     false,
  },
  {
    slug:       "newmarket_16-may-2026",
    date:       "16 May 2026",
    label:      "Newmarket — 16 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "newmarket",
    latest:     false,
  },
  {
    slug:       "newbury_16-may-2026",
    date:       "16 May 2026",
    label:      "Newbury — 16 May 2026",
    going:      "Good",
    races:      8,
    courseSlug: "newbury",
    latest:     false,
  },
  {
    slug:       "navan_16-may-2026",
    date:       "16 May 2026",
    label:      "Navan — 16 May 2026",
    going:      "Good",
    races:      8,
    courseSlug: "navan",
    latest:     false,
  },
  {
    slug:       "doncaster_16-may-2026",
    date:       "16 May 2026",
    label:      "Doncaster — 16 May 2026",
    going:      "Good",
    races:      8,
    courseSlug: "doncaster",
    latest:     false,
  },
  {
    slug:       "bangor-on-dee_16-may-2026",
    date:       "16 May 2026",
    label:      "Bangor-on-Dee — 16 May 2026",
    going:      "Good",
    races:      6,
    courseSlug: "bangor-on-dee",
    latest:     false,
  },
  {
    slug:       "york_15-may-2026",
    date:       "15 May 2026",
    label:      "York — 15 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "york",
    latest:     false,
  },
  {
    slug:       "newmarket_15-may-2026",
    date:       "15 May 2026",
    label:      "Newmarket — 15 May 2026",
    going:      "Good",
    races:      8,
    courseSlug: "newmarket",
    latest:     false,
  },
  {
    slug:       "newbury_15-may-2026",
    date:       "15 May 2026",
    label:      "Newbury — 15 May 2026",
    going:      "Good",
    races:      8,
    courseSlug: "newbury",
    latest:     false,
  },
  {
    slug:       "leopardstown_15-may-2026",
    date:       "15 May 2026",
    label:      "Leopardstown — 15 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "leopardstown",
    latest:     false,
  },
  {
    slug:       "kilbeggan_15-may-2026",
    date:       "15 May 2026",
    label:      "Kilbeggan — 15 May 2026",
    going:      "Good To Soft",
    races:      7,
    courseSlug: "kilbeggan",
    latest:     false,
  },
  {
    slug:       "hamilton_15-may-2026",
    date:       "15 May 2026",
    label:      "Hamilton — 15 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "hamilton",
    latest:     false,
  },
  {
    slug:       "aintree_15-may-2026",
    date:       "15 May 2026",
    label:      "Aintree — 15 May 2026",
    going:      "Good",
    races:      8,
    courseSlug: "aintree",
    latest:     false,
  },
  {
    slug:       "york_14-may-2026",
    date:       "14 May 2026",
    label:      "York — 14 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "york",
    latest:     false,
  },
  {
    slug:       "salisbury_14-may-2026",
    date:       "14 May 2026",
    label:      "Salisbury — 14 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "salisbury",
    latest:     false,
  },
  {
    slug:       "perth_14-may-2026",
    date:       "14 May 2026",
    label:      "Perth — 14 May 2026",
    going:      "Soft",
    races:      7,
    courseSlug: "perth",
    latest:     false,
  },
  {
    slug:       "fontwell_14-may-2026",
    date:       "14 May 2026",
    label:      "Fontwell — 14 May 2026",
    going:      "Good",
    races:      6,
    courseSlug: "fontwell",
    latest:     false,
  },
  {
    slug:       "clonmel_14-may-2026",
    date:       "14 May 2026",
    label:      "Clonmel — 14 May 2026",
    going:      "Good",
    races:      8,
    courseSlug: "clonmel",
    latest:     false,
  },
  {
    slug:       "york_13-may-2026",
    date:       "13 May 2026",
    label:      "York — 13 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "york",
    latest:     false,
  },
  {
    slug:       "yarmouth_13-may-2026",
    date:       "13 May 2026",
    label:      "Yarmouth — 13 May 2026",
    going:      "Good",
    races:      6,
    courseSlug: "yarmouth",
    latest:     false,
  },
  {
    slug:       "punchestown_13-may-2026",
    date:       "13 May 2026",
    label:      "Punchestown — 13 May 2026",
    going:      "Good",
    races:      8,
    courseSlug: "punchestown",
    latest:     false,
  },
  {
    slug:       "perth_13-may-2026",
    date:       "13 May 2026",
    label:      "Perth — 13 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "perth",
    latest:     false,
  },
  {
    slug:       "newton_abbot_13-may-2026",
    date:       "13 May 2026",
    label:      "Newton Abbot — 13 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "newton-abbot",
    latest:     false,
  },
  {
    slug:       "bath_13-may-2026",
    date:       "13 May 2026",
    label:      "Bath — 13 May 2026",
    going:      "Firm",
    races:      7,
    courseSlug: "bath",
    latest:     false,
  },
  {
    slug:       "sligo_12-may-2026",
    date:       "12 May 2026",
    label:      "Sligo — 12 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "sligo",
    latest:     false,
  },
  {
    slug:       "lingfield_aw_12-may-2026",
    date:       "12 May 2026",
    label:      "Lingfield (AW) — 12 May 2026",
    going:      "Standard",
    races:      7,
    courseSlug: "lingfield-aw",
    latest:     false,
  },
  {
    slug:       "killarney_12-may-2026",
    date:       "12 May 2026",
    label:      "Killarney — 12 May 2026",
    going:      "Good To Soft",
    races:      7,
    courseSlug: "killarney",
    latest:     false,
  },
  {
    slug:       "hereford_12-may-2026",
    date:       "12 May 2026",
    label:      "Hereford — 12 May 2026",
    going:      "Good",
    races:      6,
    courseSlug: "hereford",
    latest:     false,
  },
  {
    slug:       "beverley_12-may-2026",
    date:       "12 May 2026",
    label:      "Beverley — 12 May 2026",
    going:      "Good",
    races:      6,
    courseSlug: "beverley",
    latest:     false,
  },
  {
    slug:       "bath_12-may-2026",
    date:       "12 May 2026",
    label:      "Bath — 12 May 2026",
    going:      "Good",
    races:      6,
    courseSlug: "bath",
    latest:     false,
  },
  {
    slug:       "wolverhampton_aw_11-may-2026",
    date:       "11 May 2026",
    label:      "Wolverhampton (AW) — 11 May 2026",
    going:      "Standard",
    races:      6,
    courseSlug: "wolverhampton-aw",
    latest:     false,
  },
  {
    slug:       "windsor_11-may-2026",
    date:       "11 May 2026",
    label:      "Windsor — 11 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "windsor",
    latest:     false,
  },
  {
    slug:       "southwell_11-may-2026",
    date:       "11 May 2026",
    label:      "Southwell — 11 May 2026",
    going:      "Standard",
    races:      7,
    courseSlug: "southwell",
    latest:     false,
  },
  {
    slug:       "roscommon_11-may-2026",
    date:       "11 May 2026",
    label:      "Roscommon — 11 May 2026",
    going:      "Good",
    races:      8,
    courseSlug: "roscommon",
    latest:     false,
  },
  {
    slug:       "killarney_11-may-2026",
    date:       "11 May 2026",
    label:      "Killarney — 11 May 2026",
    going:      "Good To Soft",
    races:      8,
    courseSlug: "killarney",
    latest:     false,
  },
  {
    slug:       "catterick_11-may-2026",
    date:       "11 May 2026",
    label:      "Catterick — 11 May 2026",
    going:      "Good",
    races:      6,
    courseSlug: "catterick",
    latest:     false,
  },
  {
    slug:       "plumpton_10-may-2026",
    date:       "10 May 2026",
    label:      "Plumpton — 10 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "plumpton",
    latest:     false,
  },
  {
    slug:       "ludlow_10-may-2026",
    date:       "10 May 2026",
    label:      "Ludlow — 10 May 2026",
    going:      "Good",
    races:      6,
    courseSlug: "ludlow",
    latest:     false,
  },
  {
    slug:       "leopardstown_10-may-2026",
    date:       "10 May 2026",
    label:      "Leopardstown — 10 May 2026",
    going:      "Good",
    races:      8,
    courseSlug: "leopardstown",
    latest:     false,
  },
  {
    slug:       "cork_10-may-2026",
    date:       "10 May 2026",
    label:      "Cork — 10 May 2026",
    going:      "Good",
    races:      8,
    courseSlug: "cork",
    latest:     false,
  },
  {
    slug:       "warwick_9-may-2026",
    date:       "9 May 2026",
    label:      "Warwick — 9 May 2026",
    going:      "Good",
    races:      6,
    courseSlug: "warwick",
    latest:     false,
  },
  {
    slug:       "nottingham_9-may-2026",
    date:       "9 May 2026",
    label:      "Nottingham — 9 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "nottingham",
    latest:     false,
  },
  {
    slug:       "naas_9-may-2026",
    date:       "9 May 2026",
    label:      "Naas — 9 May 2026",
    going:      "Good",
    races:      8,
    courseSlug: "naas",
    latest:     false,
  },
  {
    slug:       "lingfield_9-may-2026",
    date:       "9 May 2026",
    label:      "Lingfield — 9 May 2026",
    going:      "Standard",
    races:      7,
    courseSlug: "lingfield",
    latest:     false,
  },
  {
    slug:       "leicester_9-may-2026",
    date:       "9 May 2026",
    label:      "Leicester — 9 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "leicester",
    latest:     false,
  },
  {
    slug:       "killarney_9-may-2026",
    date:       "9 May 2026",
    label:      "Killarney — 9 May 2026",
    going:      "Good",
    races:      8,
    courseSlug: "killarney",
    latest:     false,
  },
  {
    slug:       "hexham_9-may-2026",
    date:       "9 May 2026",
    label:      "Hexham — 9 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "hexham",
    latest:     false,
  },
  {
    slug:       "haydock_9-may-2026",
    date:       "9 May 2026",
    label:      "Haydock — 9 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "haydock",
    latest:     false,
  },
  {
    slug:       "ascot_9-may-2026",
    date:       "9 May 2026",
    label:      "Ascot — 9 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "ascot",
    latest:     false,
  },
  {
    slug:       "wolverhampton_aw_8-may-2026",
    date:       "8 May 2026",
    label:      "Wolverhampton (AW) — 8 May 2026",
    going:      "Standard",
    races:      7,
    courseSlug: "wolverhampton-aw",
    latest:     false,
  },
  {
    slug:       "ripon_8-may-2026",
    date:       "8 May 2026",
    label:      "Ripon — 8 May 2026",
    going:      "Good",
    races:      6,
    courseSlug: "ripon",
    latest:     false,
  },
  {
    slug:       "market_rasen_8-may-2026",
    date:       "8 May 2026",
    label:      "Market Rasen — 8 May 2026",
    going:      "Good",
    races:      6,
    courseSlug: "market-rasen",
    latest:     false,
  },
  {
    slug:       "downpatrick_8-may-2026",
    date:       "8 May 2026",
    label:      "Downpatrick — 8 May 2026",
    going:      "Good To Soft",
    races:      7,
    courseSlug: "downpatrick",
    latest:     false,
  },
  {
    slug:       "chester_8-may-2026",
    date:       "8 May 2026",
    label:      "Chester — 8 May 2026",
    going:      "Good",
    races:      8,
    courseSlug: "chester",
    latest:     false,
  },
  {
    slug:       "ballinrobe_8-may-2026",
    date:       "8 May 2026",
    label:      "Ballinrobe — 8 May 2026",
    going:      "Good To Soft",
    races:      8,
    courseSlug: "ballinrobe",
    latest:     false,
  },
  {
    slug:       "ascot_8-may-2026",
    date:       "8 May 2026",
    label:      "Ascot — 8 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "ascot",
    latest:     false,
  },
  {
    slug:       "windsor_7-may-2026",
    date:       "7 May 2026",
    label:      "Windsor — 7 May 2026",
    going:      "Good",
    races:      6,
    courseSlug: "windsor",
    latest:     false,
  },
  {
    slug:       "wexford_7-may-2026",
    date:       "7 May 2026",
    label:      "Wexford — 7 May 2026",
    going:      "Good To Soft",
    races:      7,
    courseSlug: "wexford",
    latest:     false,
  },
  {
    slug:       "southwell_aw_7-may-2026",
    date:       "7 May 2026",
    label:      "Southwell (AW) — 7 May 2026",
    going:      "Standard",
    races:      7,
    courseSlug: "southwell-aw",
    latest:     false,
  },
  {
    slug:       "redcar_7-may-2026",
    date:       "7 May 2026",
    label:      "Redcar — 7 May 2026",
    going:      "Good",
    races:      8,
    courseSlug: "redcar",
    latest:     false,
  },
  {
    slug:       "huntingdon_7-may-2026",
    date:       "7 May 2026",
    label:      "Huntingdon — 7 May 2026",
    going:      "Good",
    races:      6,
    courseSlug: "huntingdon",
    latest:     false,
  },
  {
    slug:       "chester_7-may-2026",
    date:       "7 May 2026",
    label:      "Chester — 7 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "chester",
    latest:     false,
  },
  {
    slug:       "newton_abbot_6-may-2026",
    date:       "6 May 2026",
    label:      "Newton Abbot — 6 May 2026",
    going:      "Soft",
    races:      6,
    courseSlug: "newton-abbot",
    latest:     false,
  },
  {
    slug:       "kempton_aw_6-may-2026",
    date:       "6 May 2026",
    label:      "Kempton (AW) — 6 May 2026",
    going:      "Standard",
    races:      7,
    courseSlug: "kempton-aw",
    latest:     false,
  },
  {
    slug:       "kelso_6-may-2026",
    date:       "6 May 2026",
    label:      "Kelso — 6 May 2026",
    going:      "Good",
    races:      8,
    courseSlug: "kelso",
    latest:     false,
  },
  {
    slug:       "fontwell_6-may-2026",
    date:       "6 May 2026",
    label:      "Fontwell — 6 May 2026",
    going:      "Good",
    races:      6,
    courseSlug: "fontwell",
    latest:     false,
  },
  {
    slug:       "chester_6-may-2026",
    date:       "6 May 2026",
    label:      "Chester — 6 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "chester",
    latest:     false,
  },
  {
    slug:       "wolverhampton_aw_5-may-2026",
    date:       "5 May 2026",
    label:      "Wolverhampton (AW) — 5 May 2026",
    going:      "Standard",
    races:      6,
    courseSlug: "wolverhampton-aw",
    latest:     false,
  },
  {
    slug:       "hereford_5-may-2026",
    date:       "5 May 2026",
    label:      "Hereford — 5 May 2026",
    going:      "Good",
    races:      6,
    courseSlug: "hereford",
    latest:     false,
  },
  {
    slug:       "gowran_park_5-may-2026",
    date:       "5 May 2026",
    label:      "Gowran Park — 5 May 2026",
    going:      "Good To Soft",
    races:      7,
    courseSlug: "gowran-park",
    latest:     false,
  },
  {
    slug:       "ffos_las_5-may-2026",
    date:       "5 May 2026",
    label:      "Ffos Las — 5 May 2026",
    going:      "Good",
    races:      6,
    courseSlug: "ffos-las",
    latest:     false,
  },
  {
    slug:       "ayr_5-may-2026",
    date:       "5 May 2026",
    label:      "Ayr — 5 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "ayr",
    latest:     false,
  },
  {
    slug:       "windsor_4-may-2026",
    date:       "4 May 2026",
    label:      "Windsor — 4 May 2026",
    going:      "Good",
    races:      8,
    courseSlug: "windsor",
    latest:     false,
  },
  {
    slug:       "warwick_4-may-2026",
    date:       "4 May 2026",
    label:      "Warwick — 4 May 2026",
    going:      "Good",
    races:      6,
    courseSlug: "warwick",
    latest:     false,
  },
  {
    slug:       "kempton_aw_4-may-2026",
    date:       "4 May 2026",
    label:      "Kempton (AW) — 4 May 2026",
    going:      "Standard",
    races:      8,
    courseSlug: "kempton-aw",
    latest:     false,
  },
  {
    slug:       "fakenham_4-may-2026",
    date:       "4 May 2026",
    label:      "Fakenham — 4 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "fakenham",
    latest:     false,
  },
  {
    slug:       "down_royal_4-may-2026",
    date:       "4 May 2026",
    label:      "Down Royal — 4 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "down-royal",
    latest:     false,
  },
  {
    slug:       "curragh_4-may-2026",
    date:       "4 May 2026",
    label:      "Curragh — 4 May 2026",
    going:      "Good",
    races:      8,
    courseSlug: "curragh",
    latest:     false,
  },
  {
    slug:       "beverley_4-may-2026",
    date:       "4 May 2026",
    label:      "Beverley — 4 May 2026",
    going:      "Soft",
    races:      8,
    courseSlug: "beverley",
    latest:     false,
  },
  {
    slug:       "bath_4-may-2026",
    date:       "4 May 2026",
    label:      "Bath — 4 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "bath",
    latest:     false,
  },
  {
    slug:       "sligo_3-may-2026",
    date:       "3 May 2026",
    label:      "Sligo — 3 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "sligo",
    latest:     false,
  },
  {
    slug:       "salisbury_3-may-2026",
    date:       "3 May 2026",
    label:      "Salisbury — 3 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "salisbury",
    latest:     false,
  },
  {
    slug:       "newmarket_3-may-2026",
    date:       "3 May 2026",
    label:      "Newmarket — 3 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "newmarket",
    latest:     false,
  },
  {
    slug:       "hamilton_3-may-2026",
    date:       "3 May 2026",
    label:      "Hamilton — 3 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "hamilton",
    latest:     false,
  },
  {
    slug:       "cork_3-may-2026",
    date:       "3 May 2026",
    label:      "Cork — 3 May 2026",
    going:      "Good To Soft",
    races:      8,
    courseSlug: "cork",
    latest:     false,
  },
  {
    slug:       "uttoxeter_2-may-2026",
    date:       "2 May 2026",
    label:      "Uttoxeter — 2 May 2026",
    going:      "Good",
    races:      8,
    courseSlug: "uttoxeter",
    latest:     false,
  },
  {
    slug:       "thirsk_2-may-2026",
    date:       "2 May 2026",
    label:      "Thirsk — 2 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "thirsk",
    latest:     false,
  },
  {
    slug:       "punchestown_2-may-2026",
    date:       "2 May 2026",
    label:      "Punchestown — 2 May 2026",
    going:      "Good To Soft",
    races:      8,
    courseSlug: "punchestown",
    latest:     false,
  },
  {
    slug:       "newmarket_2-may-2026",
    date:       "2 May 2026",
    label:      "Newmarket — 2 May 2026",
    going:      "Good",
    races:      9,
    courseSlug: "newmarket",
    latest:     false,
  },
  {
    slug:       "hexham_2-may-2026",
    date:       "2 May 2026",
    label:      "Hexham — 2 May 2026",
    going:      "Good",
    races:      8,
    courseSlug: "hexham",
    latest:     false,
  },
  {
    slug:       "goodwood_2-may-2026",
    date:       "2 May 2026",
    label:      "Goodwood — 2 May 2026",
    going:      "Good",
    races:      8,
    courseSlug: "goodwood",
    latest:     false,
  },
  {
    slug:       "doncaster_2-may-2026",
    date:       "2 May 2026",
    label:      "Doncaster — 2 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "doncaster",
    latest:     false,
  },
  {
    slug:       "warwick_1-may-2026",
    date:       "1 May 2026",
    label:      "Warwick — 1 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "warwick",
    latest:     false,
  },
  {
    slug:       "punchestown_1-may-2026",
    date:       "1 May 2026",
    label:      "Punchestown — 1 May 2026",
    going:      "Good To Soft",
    races:      8,
    courseSlug: "punchestown",
    latest:     false,
  },
  {
    slug:       "newmarket_1-may-2026",
    date:       "1 May 2026",
    label:      "Newmarket — 1 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "newmarket",
    latest:     false,
  },
  {
    slug:       "newcastle_aw_1-may-2026",
    date:       "1 May 2026",
    label:      "Newcastle (AW) — 1 May 2026",
    going:      "Standard",
    races:      7,
    courseSlug: "newcastle-aw",
    latest:     false,
  },
  {
    slug:       "goodwood_1-may-2026",
    date:       "1 May 2026",
    label:      "Goodwood — 1 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "goodwood",
    latest:     false,
  },
  {
    slug:       "ascot_1-may-2026",
    date:       "1 May 2026",
    label:      "Ascot — 1 May 2026",
    going:      "Good",
    races:      7,
    courseSlug: "ascot",
    latest:     false,
  },
  {
    slug:       "yarmouth_30-april-2026",
    date:       "30 April 2026",
    label:      "Yarmouth — 30 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "yarmouth",
    latest:     false,
  },
  {
    slug:       "southwell_aw_30-april-2026",
    date:       "30 April 2026",
    label:      "Southwell (AW) — 30 April 2026",
    going:      "Standard",
    races:      7,
    courseSlug: "southwell-aw",
    latest:     false,
  },
  {
    slug:       "redcar_30-april-2026",
    date:       "30 April 2026",
    label:      "Redcar — 30 April 2026",
    going:      "Good",
    races:      6,
    courseSlug: "redcar",
    latest:     false,
  },
  {
    slug:       "punchestown_30-april-2026",
    date:       "30 April 2026",
    label:      "Punchestown — 30 April 2026",
    going:      "Good To Soft",
    races:      8,
    courseSlug: "punchestown",
    latest:     false,
  },
  {
    slug:       "lingfield_aw_30-april-2026",
    date:       "30 April 2026",
    label:      "Lingfield (AW) — 30 April 2026",
    going:      "Standard",
    races:      8,
    courseSlug: "lingfield-aw",
    latest:     false,
  },
  {
    slug:       "kempton_aw_30-april-2026",
    date:       "30 April 2026",
    label:      "Kempton (AW) — 30 April 2026",
    going:      "Standard",
    races:      7,
    courseSlug: "kempton-aw",
    latest:     false,
  },
  {
    slug:       "southwell_aw_29-april-2026",
    date:       "29 April 2026",
    label:      "Southwell (AW) — 29 April 2026",
    going:      "Standard",
    races:      8,
    courseSlug: "southwell-aw",
    latest:     false,
  },
  {
    slug:       "punchestown_29-april-2026",
    date:       "29 April 2026",
    label:      "Punchestown — 29 April 2026",
    going:      "Good To Soft",
    races:      8,
    courseSlug: "punchestown",
    latest:     false,
  },
  {
    slug:       "pontefract_29-april-2026",
    date:       "29 April 2026",
    label:      "Pontefract — 29 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "pontefract",
    latest:     false,
  },
  {
    slug:       "musselburgh_29-april-2026",
    date:       "29 April 2026",
    label:      "Musselburgh — 29 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "musselburgh",
    latest:     false,
  },
  {
    slug:       "bath_29-april-2026",
    date:       "29 April 2026",
    label:      "Bath — 29 April 2026",
    going:      "Firm",
    races:      8,
    courseSlug: "bath",
    latest:     false,
  },
  {
    slug:       "yarmouth_28-april-2026",
    date:       "28 April 2026",
    label:      "Yarmouth — 28 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "yarmouth",
    latest:     false,
  },
  {
    slug:       "southwell_aw_28-april-2026",
    date:       "28 April 2026",
    label:      "Southwell (AW) — 28 April 2026",
    going:      "Standard",
    races:      7,
    courseSlug: "southwell-aw",
    latest:     false,
  },
  {
    slug:       "punchestown_28-april-2026",
    date:       "28 April 2026",
    label:      "Punchestown — 28 April 2026",
    going:      "Good To Soft",
    races:      8,
    courseSlug: "punchestown",
    latest:     false,
  },
  {
    slug:       "lingfield_aw_28-april-2026",
    date:       "28 April 2026",
    label:      "Lingfield (AW) — 28 April 2026",
    going:      "Standard",
    races:      7,
    courseSlug: "lingfield-aw",
    latest:     false,
  },
  {
    slug:       "epsom_28-april-2026",
    date:       "28 April 2026",
    label:      "Epsom — 28 April 2026",
    going:      "Good",
    races:      6,
    courseSlug: "epsom",
    latest:     false,
  },
  {
    slug:       "wolverhampton_aw_27-april-2026",
    date:       "27 April 2026",
    label:      "Wolverhampton (AW) — 27 April 2026",
    going:      "Standard",
    races:      7,
    courseSlug: "wolverhampton-aw",
    latest:     false,
  },
  {
    slug:       "naas_27-april-2026",
    date:       "27 April 2026",
    label:      "Naas — 27 April 2026",
    going:      "Good To Soft",
    races:      7,
    courseSlug: "naas",
    latest:     false,
  },
  {
    slug:       "lingfield_aw_27-april-2026",
    date:       "27 April 2026",
    label:      "Lingfield (AW) — 27 April 2026",
    going:      "Standard",
    races:      7,
    courseSlug: "lingfield-aw",
    latest:     false,
  },
  {
    slug:       "bath_27-april-2026",
    date:       "27 April 2026",
    label:      "Bath — 27 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "bath",
    latest:     false,
  },
  {
    slug:       "wetherby_26-april-2026",
    date:       "26 April 2026",
    label:      "Wetherby — 26 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "wetherby",
    latest:     false,
  },
  {
    slug:       "nottingham_26-april-2026",
    date:       "26 April 2026",
    label:      "Nottingham — 26 April 2026",
    going:      "Good",
    races:      8,
    courseSlug: "nottingham",
    latest:     false,
  },
  {
    slug:       "musselburgh_26-april-2026",
    date:       "26 April 2026",
    label:      "Musselburgh — 26 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "musselburgh",
    latest:     false,
  },
  {
    slug:       "southwell_aw_25-april-2026",
    date:       "25 April 2026",
    label:      "Southwell (AW) — 25 April 2026",
    going:      "Standard",
    races:      7,
    courseSlug: "southwell-aw",
    latest:     false,
  },
  {
    slug:       "sandown_25-april-2026",
    date:       "25 April 2026",
    label:      "Sandown — 25 April 2026",
    going:      "Good",
    races:      8,
    courseSlug: "sandown",
    latest:     false,
  },
  {
    slug:       "ripon_25-april-2026",
    date:       "25 April 2026",
    label:      "Ripon — 25 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "ripon",
    latest:     false,
  },
  {
    slug:       "navan_25-april-2026",
    date:       "25 April 2026",
    label:      "Navan — 25 April 2026",
    going:      "Good To Soft",
    races:      8,
    courseSlug: "navan",
    latest:     false,
  },
  {
    slug:       "limerick_25-april-2026",
    date:       "25 April 2026",
    label:      "Limerick — 25 April 2026",
    going:      "Good To Soft",
    races:      8,
    courseSlug: "limerick",
    latest:     false,
  },
  {
    slug:       "leicester_25-april-2026",
    date:       "25 April 2026",
    label:      "Leicester — 25 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "leicester",
    latest:     false,
  },
  {
    slug:       "haydock_25-april-2026",
    date:       "25 April 2026",
    label:      "Haydock — 25 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "haydock",
    latest:     false,
  },
  {
    slug:       "doncaster_25-april-2026",
    date:       "25 April 2026",
    label:      "Doncaster — 25 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "doncaster",
    latest:     false,
  },
  {
    slug:       "sandown_24-april-2026",
    date:       "24 April 2026",
    label:      "Sandown — 24 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "sandown",
    latest:     false,
  },
  {
    slug:       "perth_24-april-2026",
    date:       "24 April 2026",
    label:      "Perth — 24 April 2026",
    going:      "Good",
    races:      8,
    courseSlug: "perth",
    latest:     false,
  },
  {
    slug:       "kilbeggan_24-april-2026",
    date:       "24 April 2026",
    label:      "Kilbeggan — 24 April 2026",
    going:      "Good To Soft",
    races:      8,
    courseSlug: "kilbeggan",
    latest:     false,
  },
  {
    slug:       "fontwell_24-april-2026",
    date:       "24 April 2026",
    label:      "Fontwell — 24 April 2026",
    going:      "Soft",
    races:      6,
    courseSlug: "fontwell",
    latest:     false,
  },
  {
    slug:       "doncaster_24-april-2026",
    date:       "24 April 2026",
    label:      "Doncaster — 24 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "doncaster",
    latest:     false,
  },
  {
    slug:       "cork_24-april-2026",
    date:       "24 April 2026",
    label:      "Cork — 24 April 2026",
    going:      "Good To Soft",
    races:      7,
    courseSlug: "cork",
    latest:     false,
  },
  {
    slug:       "chepstow_24-april-2026",
    date:       "24 April 2026",
    label:      "Chepstow — 24 April 2026",
    going:      "Soft",
    races:      8,
    courseSlug: "chepstow",
    latest:     false,
  },
  {
    slug:       "warwick_23-april-2026",
    date:       "23 April 2026",
    label:      "Warwick — 23 April 2026",
    going:      "Good",
    races:      8,
    courseSlug: "warwick",
    latest:     false,
  },
  {
    slug:       "southwell_aw_23-april-2026",
    date:       "23 April 2026",
    label:      "Southwell (AW) — 23 April 2026",
    going:      "Standard",
    races:      8,
    courseSlug: "southwell-aw",
    latest:     false,
  },
  {
    slug:       "perth_23-april-2026",
    date:       "23 April 2026",
    label:      "Perth — 23 April 2026",
    going:      "Good",
    races:      8,
    courseSlug: "perth",
    latest:     false,
  },
  {
    slug:       "dundalk_aw_23-april-2026",
    date:       "23 April 2026",
    label:      "Dundalk (AW) — 23 April 2026",
    going:      "Standard",
    races:      7,
    courseSlug: "dundalk-aw",
    latest:     false,
  },
  {
    slug:       "beverley_23-april-2026",
    date:       "23 April 2026",
    label:      "Beverley — 23 April 2026",
    going:      "Good",
    races:      8,
    courseSlug: "beverley",
    latest:     false,
  },
  {
    slug:       "taunton_22-april-2026",
    date:       "22 April 2026",
    label:      "Taunton — 22 April 2026",
    going:      "Good",
    races:      6,
    courseSlug: "taunton",
    latest:     false,
  },
  {
    slug:       "perth_22-april-2026",
    date:       "22 April 2026",
    label:      "Perth — 22 April 2026",
    going:      "Soft",
    races:      8,
    courseSlug: "perth",
    latest:     false,
  },
  {
    slug:       "ludlow_22-april-2026",
    date:       "22 April 2026",
    label:      "Ludlow — 22 April 2026",
    going:      "Good",
    races:      6,
    courseSlug: "ludlow",
    latest:     false,
  },
  {
    slug:       "gowran_park_22-april-2026",
    date:       "22 April 2026",
    label:      "Gowran Park — 22 April 2026",
    going:      "Heavy",
    races:      7,
    courseSlug: "gowran-park",
    latest:     false,
  },
  {
    slug:       "catterick_22-april-2026",
    date:       "22 April 2026",
    label:      "Catterick — 22 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "catterick",
    latest:     false,
  },
  {
    slug:       "yarmouth_21-april-2026",
    date:       "21 April 2026",
    label:      "Yarmouth — 21 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "yarmouth",
    latest:     false,
  },
  {
    slug:       "wolverhampton_aw_21-april-2026",
    date:       "21 April 2026",
    label:      "Wolverhampton (AW) — 21 April 2026",
    going:      "Standard",
    races:      8,
    courseSlug: "wolverhampton-aw",
    latest:     false,
  },
  {
    slug:       "pontefract_21-april-2026",
    date:       "21 April 2026",
    label:      "Pontefract — 21 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "pontefract",
    latest:     false,
  },
  {
    slug:       "ffos_las_21-april-2026",
    date:       "21 April 2026",
    label:      "Ffos Las — 21 April 2026",
    going:      "Soft",
    races:      7,
    courseSlug: "ffos-las",
    latest:     false,
  },
  {
    slug:       "epsom_21-april-2026",
    date:       "21 April 2026",
    label:      "Epsom — 21 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "epsom",
    latest:     false,
  },
  {
    slug:       "tramore_20-april-2026",
    date:       "20 April 2026",
    label:      "Tramore — 20 April 2026",
    going:      "Good To Soft",
    races:      8,
    courseSlug: "tramore",
    latest:     false,
  },
  {
    slug:       "redcar_20-april-2026",
    date:       "20 April 2026",
    label:      "Redcar — 20 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "redcar",
    latest:     false,
  },
  {
    slug:       "newcastle_aw_20-april-2026",
    date:       "20 April 2026",
    label:      "Newcastle (AW) — 20 April 2026",
    going:      "Standard",
    races:      7,
    courseSlug: "newcastle-aw",
    latest:     false,
  },
  {
    slug:       "lingfield_aw_20-april-2026",
    date:       "20 April 2026",
    label:      "Lingfield (AW) — 20 April 2026",
    going:      "Standard",
    races:      7,
    courseSlug: "lingfield-aw",
    latest:     false,
  },
  {
    slug:       "kelso_20-april-2026",
    date:       "20 April 2026",
    label:      "Kelso — 20 April 2026",
    going:      "Good",
    races:      8,
    courseSlug: "kelso",
    latest:     false,
  },
  {
    slug:       "tramore_19-april-2026",
    date:       "19 April 2026",
    label:      "Tramore — 19 April 2026",
    going:      "Soft",
    races:      7,
    courseSlug: "tramore",
    latest:     false,
  },
  {
    slug:       "stratford_19-april-2026",
    date:       "19 April 2026",
    label:      "Stratford — 19 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "stratford",
    latest:     false,
  },
  {
    slug:       "plumpton_19-april-2026",
    date:       "19 April 2026",
    label:      "Plumpton — 19 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "plumpton",
    latest:     false,
  },
  {
    slug:       "curragh_19-april-2026",
    date:       "19 April 2026",
    label:      "Curragh — 19 April 2026",
    going:      "Soft",
    races:      8,
    courseSlug: "curragh",
    latest:     false,
  },
  {
    slug:       "thirsk_18-april-2026",
    date:       "18 April 2026",
    label:      "Thirsk — 18 April 2026",
    going:      "Good",
    races:      8,
    courseSlug: "thirsk",
    latest:     false,
  },
  {
    slug:       "nottingham_18-april-2026",
    date:       "18 April 2026",
    label:      "Nottingham — 18 April 2026",
    going:      "Good",
    races:      8,
    courseSlug: "nottingham",
    latest:     false,
  },
  {
    slug:       "newbury_18-april-2026",
    date:       "18 April 2026",
    label:      "Newbury — 18 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "newbury",
    latest:     false,
  },
  {
    slug:       "brighton_18-april-2026",
    date:       "18 April 2026",
    label:      "Brighton — 18 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "brighton",
    latest:     false,
  },
  {
    slug:       "bellewstown_18-april-2026",
    date:       "18 April 2026",
    label:      "Bellewstown — 18 April 2026",
    going:      "Good To Soft",
    races:      7,
    courseSlug: "bellewstown",
    latest:     false,
  },
  {
    slug:       "bangor-on-dee_18-april-2026",
    date:       "18 April 2026",
    label:      "Bangor-on-Dee — 18 April 2026",
    going:      "Good",
    races:      8,
    courseSlug: "bangor-on-dee",
    latest:     false,
  },
  {
    slug:       "ayr_18-april-2026",
    date:       "18 April 2026",
    label:      "Ayr — 18 April 2026",
    going:      "Soft",
    races:      7,
    courseSlug: "ayr",
    latest:     false,
  },
  {
    slug:       "wolverhampton_aw_17-april-2026",
    date:       "17 April 2026",
    label:      "Wolverhampton (AW) — 17 April 2026",
    going:      "Standard",
    races:      7,
    courseSlug: "wolverhampton-aw",
    latest:     false,
  },
  {
    slug:       "newbury_17-april-2026",
    date:       "17 April 2026",
    label:      "Newbury — 17 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "newbury",
    latest:     false,
  },
  {
    slug:       "exeter_17-april-2026",
    date:       "17 April 2026",
    label:      "Exeter — 17 April 2026",
    going:      "Good",
    races:      8,
    courseSlug: "exeter",
    latest:     false,
  },
  {
    slug:       "bath_17-april-2026",
    date:       "17 April 2026",
    label:      "Bath — 17 April 2026",
    going:      "Good",
    races:      8,
    courseSlug: "bath",
    latest:     false,
  },
  {
    slug:       "ballinrobe_17-april-2026",
    date:       "17 April 2026",
    label:      "Ballinrobe — 17 April 2026",
    going:      "Soft",
    races:      7,
    courseSlug: "ballinrobe",
    latest:     false,
  },
  {
    slug:       "ayr_17-april-2026",
    date:       "17 April 2026",
    label:      "Ayr — 17 April 2026",
    going:      "Soft",
    races:      7,
    courseSlug: "ayr",
    latest:     false,
  },
  {
    slug:       "ripon_16-april-2026",
    date:       "16 April 2026",
    label:      "Ripon — 16 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "ripon",
    latest:     false,
  },
  {
    slug:       "newmarket_16-april-2026",
    date:       "16 April 2026",
    label:      "Newmarket — 16 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "newmarket",
    latest:     false,
  },
  {
    slug:       "limerick_16-april-2026",
    date:       "16 April 2026",
    label:      "Limerick — 16 April 2026",
    going:      "Soft",
    races:      8,
    courseSlug: "limerick",
    latest:     false,
  },
  {
    slug:       "hereford_16-april-2026",
    date:       "16 April 2026",
    label:      "Hereford — 16 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "hereford",
    latest:     false,
  },
  {
    slug:       "southwell_aw_15-april-2026",
    date:       "15 April 2026",
    label:      "Southwell (AW) — 15 April 2026",
    going:      "Standard",
    races:      7,
    courseSlug: "southwell-aw",
    latest:     false,
  },
  {
    slug:       "newmarket_15-april-2026",
    date:       "15 April 2026",
    label:      "Newmarket — 15 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "newmarket",
    latest:     false,
  },
  {
    slug:       "leopardstown_15-april-2026",
    date:       "15 April 2026",
    label:      "Leopardstown — 15 April 2026",
    going:      "Good To Soft",
    races:      8,
    courseSlug: "leopardstown",
    latest:     false,
  },
  {
    slug:       "haydock_15-april-2026",
    date:       "15 April 2026",
    label:      "Haydock — 15 April 2026",
    going:      "Good",
    races:      8,
    courseSlug: "haydock",
    latest:     false,
  },
  {
    slug:       "beverley_15-april-2026",
    date:       "15 April 2026",
    label:      "Beverley — 15 April 2026",
    going:      "Good",
    races:      8,
    courseSlug: "beverley",
    latest:     false,
  },
  {
    slug:       "newton_abbot_14-april-2026",
    date:       "14 April 2026",
    label:      "Newton Abbot — 14 April 2026",
    going:      "Good",
    races:      6,
    courseSlug: "newton-abbot",
    latest:     false,
  },
  {
    slug:       "newmarket_14-april-2026",
    date:       "14 April 2026",
    label:      "Newmarket — 14 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "newmarket",
    latest:     false,
  },
  {
    slug:       "market_rasen_14-april-2026",
    date:       "14 April 2026",
    label:      "Market Rasen — 14 April 2026",
    going:      "Good",
    races:      8,
    courseSlug: "market-rasen",
    latest:     false,
  },
  {
    slug:       "lingfield_aw_14-april-2026",
    date:       "14 April 2026",
    label:      "Lingfield (AW) — 14 April 2026",
    going:      "Standard",
    races:      7,
    courseSlug: "lingfield-aw",
    latest:     false,
  },
  {
    slug:       "clonmel_14-april-2026",
    date:       "14 April 2026",
    label:      "Clonmel — 14 April 2026",
    going:      "Good To Soft",
    races:      7,
    courseSlug: "clonmel",
    latest:     false,
  },
  {
    slug:       "newcastle_aw_13-april-2026",
    date:       "13 April 2026",
    label:      "Newcastle (AW) — 13 April 2026",
    going:      "Standard",
    races:      7,
    courseSlug: "newcastle-aw",
    latest:     false,
  },
  {
    slug:       "leicester_13-april-2026",
    date:       "13 April 2026",
    label:      "Leicester — 13 April 2026",
    going:      "Good",
    races:      8,
    courseSlug: "leicester",
    latest:     false,
  },
  {
    slug:       "hexham_13-april-2026",
    date:       "13 April 2026",
    label:      "Hexham — 13 April 2026",
    going:      "Soft",
    races:      8,
    courseSlug: "hexham",
    latest:     false,
  },
  {
    slug:       "fakenham_13-april-2026",
    date:       "13 April 2026",
    label:      "Fakenham — 13 April 2026",
    going:      "Good",
    races:      6,
    courseSlug: "fakenham",
    latest:     false,
  },
  {
    slug:       "wincanton_12-april-2026",
    date:       "12 April 2026",
    label:      "Wincanton — 12 April 2026",
    going:      "Good",
    races:      8,
    courseSlug: "wincanton",
    latest:     false,
  },
  {
    slug:       "musselburgh_12-april-2026",
    date:       "12 April 2026",
    label:      "Musselburgh — 12 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "musselburgh",
    latest:     false,
  },
  {
    slug:       "leopardstown_12-april-2026",
    date:       "12 April 2026",
    label:      "Leopardstown — 12 April 2026",
    going:      "Good To Soft",
    races:      7,
    courseSlug: "leopardstown",
    latest:     false,
  },
  {
    slug:       "ffos_las_12-april-2026",
    date:       "12 April 2026",
    label:      "Ffos Las — 12 April 2026",
    going:      "Soft",
    races:      7,
    courseSlug: "ffos-las",
    latest:     false,
  },
  {
    slug:       "down_royal_12-april-2026",
    date:       "12 April 2026",
    label:      "Down Royal — 12 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "down-royal",
    latest:     false,
  },
  {
    slug:       "yarmouth_11-april-2026",
    date:       "11 April 2026",
    label:      "Yarmouth — 11 April 2026",
    going:      "Good",
    races:      8,
    courseSlug: "yarmouth",
    latest:     false,
  },
  {
    slug:       "southwell_aw_11-april-2026",
    date:       "11 April 2026",
    label:      "Southwell (AW) — 11 April 2026",
    going:      "Standard",
    races:      8,
    courseSlug: "southwell-aw",
    latest:     false,
  },
  {
    slug:       "newcastle_11-april-2026",
    date:       "11 April 2026",
    label:      "Newcastle — 11 April 2026",
    going:      "Standard",
    races:      7,
    courseSlug: "newcastle",
    latest:     false,
  },
  {
    slug:       "chepstow_11-april-2026",
    date:       "11 April 2026",
    label:      "Chepstow — 11 April 2026",
    going:      "Soft",
    races:      7,
    courseSlug: "chepstow",
    latest:     false,
  },
  {
    slug:       "bellewstown_11-april-2026",
    date:       "11 April 2026",
    label:      "Bellewstown — 11 April 2026",
    going:      "Soft",
    races:      7,
    courseSlug: "bellewstown",
    latest:     false,
  },
  {
    slug:       "aintree_11-april-2026",
    date:       "11 April 2026",
    label:      "Aintree — 11 April 2026",
    going:      "Soft",
    races:      7,
    courseSlug: "aintree",
    latest:     false,
  },
  {
    slug:       "wolverhampton_aw_10-april-2026",
    date:       "10 April 2026",
    label:      "Wolverhampton (AW) — 10 April 2026",
    going:      "Standard",
    races:      8,
    courseSlug: "wolverhampton-aw",
    latest:     false,
  },
  {
    slug:       "wexford_10-april-2026",
    date:       "10 April 2026",
    label:      "Wexford — 10 April 2026",
    going:      "Good To Soft",
    races:      7,
    courseSlug: "wexford",
    latest:     false,
  },
  {
    slug:       "thirsk_10-april-2026",
    date:       "10 April 2026",
    label:      "Thirsk — 10 April 2026",
    going:      "Good",
    races:      8,
    courseSlug: "thirsk",
    latest:     false,
  },
  {
    slug:       "sedgefield_10-april-2026",
    date:       "10 April 2026",
    label:      "Sedgefield — 10 April 2026",
    going:      "Good",
    races:      6,
    courseSlug: "sedgefield",
    latest:     false,
  },
  {
    slug:       "dundalk_aw_10-april-2026",
    date:       "10 April 2026",
    label:      "Dundalk (AW) — 10 April 2026",
    going:      "Standard",
    races:      7,
    courseSlug: "dundalk-aw",
    latest:     false,
  },
  {
    slug:       "aintree_10-april-2026",
    date:       "10 April 2026",
    label:      "Aintree — 10 April 2026",
    going:      "Soft",
    races:      7,
    courseSlug: "aintree",
    latest:     false,
  },
  {
    slug:       "wolverhampton_aw_9-april-2026",
    date:       "9 April 2026",
    label:      "Wolverhampton (AW) — 9 April 2026",
    going:      "Standard",
    races:      7,
    courseSlug: "wolverhampton-aw",
    latest:     false,
  },
  {
    slug:       "taunton_9-april-2026",
    date:       "9 April 2026",
    label:      "Taunton — 9 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "taunton",
    latest:     false,
  },
  {
    slug:       "southwell_aw_9-april-2026",
    date:       "9 April 2026",
    label:      "Southwell (AW) — 9 April 2026",
    going:      "Standard",
    races:      7,
    courseSlug: "southwell-aw",
    latest:     false,
  },
  {
    slug:       "gowran_park_9-april-2026",
    date:       "9 April 2026",
    label:      "Gowran Park — 9 April 2026",
    going:      "Soft",
    races:      7,
    courseSlug: "gowran-park",
    latest:     false,
  },
  {
    slug:       "aintree_9-april-2026",
    date:       "9 April 2026",
    label:      "Aintree — 9 April 2026",
    going:      "Soft",
    races:      7,
    courseSlug: "aintree",
    latest:     false,
  },
  {
    slug:       "nottingham_8-april-2026",
    date:       "8 April 2026",
    label:      "Nottingham — 8 April 2026",
    going:      "Good",
    races:      8,
    courseSlug: "nottingham",
    latest:     false,
  },
  {
    slug:       "kempton_aw_8-april-2026",
    date:       "8 April 2026",
    label:      "Kempton (AW) — 8 April 2026",
    going:      "Standard",
    races:      8,
    courseSlug: "kempton-aw",
    latest:     false,
  },
  {
    slug:       "gowran_park_8-april-2026",
    date:       "8 April 2026",
    label:      "Gowran Park — 8 April 2026",
    going:      "Soft",
    races:      8,
    courseSlug: "gowran-park",
    latest:     false,
  },
  {
    slug:       "fontwell_8-april-2026",
    date:       "8 April 2026",
    label:      "Fontwell — 8 April 2026",
    going:      "Soft",
    races:      6,
    courseSlug: "fontwell",
    latest:     false,
  },
  {
    slug:       "catterick_8-april-2026",
    date:       "8 April 2026",
    label:      "Catterick — 8 April 2026",
    going:      "Good",
    races:      8,
    courseSlug: "catterick",
    latest:     false,
  },
  {
    slug:       "southwell_aw_7-april-2026",
    date:       "7 April 2026",
    label:      "Southwell (AW) — 7 April 2026",
    going:      "Standard",
    races:      8,
    courseSlug: "southwell-aw",
    latest:     false,
  },
  {
    slug:       "pontefract_7-april-2026",
    date:       "7 April 2026",
    label:      "Pontefract — 7 April 2026",
    going:      "Soft",
    races:      8,
    courseSlug: "pontefract",
    latest:     false,
  },
  {
    slug:       "exeter_7-april-2026",
    date:       "7 April 2026",
    label:      "Exeter — 7 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "exeter",
    latest:     false,
  },
  {
    slug:       "wolverhampton_aw_6-april-2026",
    date:       "6 April 2026",
    label:      "Wolverhampton (AW) — 6 April 2026",
    going:      "Standard",
    races:      8,
    courseSlug: "wolverhampton-aw",
    latest:     false,
  },
  {
    slug:       "plumpton_6-april-2026",
    date:       "6 April 2026",
    label:      "Plumpton — 6 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "plumpton",
    latest:     false,
  },
  {
    slug:       "kempton_aw_6-april-2026",
    date:       "6 April 2026",
    label:      "Kempton (AW) — 6 April 2026",
    going:      "Standard",
    races:      8,
    courseSlug: "kempton-aw",
    latest:     false,
  },
  {
    slug:       "hereford_6-april-2026",
    date:       "6 April 2026",
    label:      "Hereford — 6 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "hereford",
    latest:     false,
  },
  {
    slug:       "fakenham_6-april-2026",
    date:       "6 April 2026",
    label:      "Fakenham — 6 April 2026",
    going:      "Good",
    races:      6,
    courseSlug: "fakenham",
    latest:     false,
  },
  {
    slug:       "fairyhouse_6-april-2026",
    date:       "6 April 2026",
    label:      "Fairyhouse — 6 April 2026",
    going:      "Soft",
    races:      8,
    courseSlug: "fairyhouse",
    latest:     false,
  },
  {
    slug:       "cork_6-april-2026",
    date:       "6 April 2026",
    label:      "Cork — 6 April 2026",
    going:      "Good To Soft",
    races:      8,
    courseSlug: "cork",
    latest:     false,
  },
  {
    slug:       "southwell_aw_5-april-2026",
    date:       "5 April 2026",
    label:      "Southwell (AW) — 5 April 2026",
    going:      "Standard",
    races:      7,
    courseSlug: "southwell-aw",
    latest:     false,
  },
  {
    slug:       "plumpton_5-april-2026",
    date:       "5 April 2026",
    label:      "Plumpton — 5 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "plumpton",
    latest:     false,
  },
  {
    slug:       "market_rasen_5-april-2026",
    date:       "5 April 2026",
    label:      "Market Rasen — 5 April 2026",
    going:      "Good",
    races:      6,
    courseSlug: "market-rasen",
    latest:     false,
  },
  {
    slug:       "fairyhouse_5-april-2026",
    date:       "5 April 2026",
    label:      "Fairyhouse — 5 April 2026",
    going:      "Soft",
    races:      10,
    courseSlug: "fairyhouse",
    latest:     false,
  },
  {
    slug:       "cork_5-april-2026",
    date:       "5 April 2026",
    label:      "Cork — 5 April 2026",
    going:      "Good To Soft",
    races:      8,
    courseSlug: "cork",
    latest:     false,
  },
  {
    slug:       "bath_5-april-2026",
    date:       "5 April 2026",
    label:      "Bath — 5 April 2026",
    going:      "Good",
    races:      8,
    courseSlug: "bath",
    latest:     false,
  },
  {
    slug:       "wolverhampton_aw_4-april-2026",
    date:       "4 April 2026",
    label:      "Wolverhampton (AW) — 4 April 2026",
    going:      "Standard",
    races:      7,
    courseSlug: "wolverhampton-aw",
    latest:     false,
  },
  {
    slug:       "newton_abbot_4-april-2026",
    date:       "4 April 2026",
    label:      "Newton Abbot — 4 April 2026",
    going:      "Soft",
    races:      6,
    courseSlug: "newton-abbot",
    latest:     false,
  },
  {
    slug:       "musselburgh_4-april-2026",
    date:       "4 April 2026",
    label:      "Musselburgh — 4 April 2026",
    going:      "Soft",
    races:      7,
    courseSlug: "musselburgh",
    latest:     false,
  },
  {
    slug:       "huntingdon_4-april-2026",
    date:       "4 April 2026",
    label:      "Huntingdon — 4 April 2026",
    going:      "Good",
    races:      6,
    courseSlug: "huntingdon",
    latest:     false,
  },
  {
    slug:       "haydock_4-april-2026",
    date:       "4 April 2026",
    label:      "Haydock — 4 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "haydock",
    latest:     false,
  },
  {
    slug:       "fairyhouse_4-april-2026",
    date:       "4 April 2026",
    label:      "Fairyhouse — 4 April 2026",
    going:      "Soft",
    races:      7,
    courseSlug: "fairyhouse",
    latest:     false,
  },
  {
    slug:       "cork_4-april-2026",
    date:       "4 April 2026",
    label:      "Cork — 4 April 2026",
    going:      "Soft",
    races:      7,
    courseSlug: "cork",
    latest:     false,
  },
  {
    slug:       "carlisle_4-april-2026",
    date:       "4 April 2026",
    label:      "Carlisle — 4 April 2026",
    going:      "Soft",
    races:      8,
    courseSlug: "carlisle",
    latest:     false,
  },
  {
    slug:       "newcastle_aw_3-april-2026",
    date:       "3 April 2026",
    label:      "Newcastle (AW) — 3 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "newcastle-aw",
    latest:     false,
  },
  {
    slug:       "lingfield_aw_3-april-2026",
    date:       "3 April 2026",
    label:      "Lingfield (AW) — 3 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "lingfield-aw",
    latest:     false,
  },
  {
    slug:       "curragh_3-april-2026",
    date:       "3 April 2026",
    label:      "Curragh — 3 April 2026",
    going:      "Soft",
    races:      8,
    courseSlug: "curragh",
    latest:     false,
  },
  {
    slug:       "chelmsford_aw_3-april-2026",
    date:       "3 April 2026",
    label:      "Chelmsford (AW) — 3 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "chelmsford-aw",
    latest:     false,
  },
  {
    slug:       "southwell_aw_2-april-2026",
    date:       "2 April 2026",
    label:      "Southwell (AW) — 2 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "southwell-aw",
    latest:     false,
  },
  {
    slug:       "kelso_2-april-2026",
    date:       "2 April 2026",
    label:      "Kelso — 2 April 2026",
    going:      "Soft",
    races:      6,
    courseSlug: "kelso",
    latest:     false,
  },
  {
    slug:       "clonmel_2-april-2026",
    date:       "2 April 2026",
    label:      "Clonmel — 2 April 2026",
    going:      "Soft",
    races:      7,
    courseSlug: "clonmel",
    latest:     false,
  },
  {
    slug:       "chepstow_2-april-2026",
    date:       "2 April 2026",
    label:      "Chepstow — 2 April 2026",
    going:      "Soft",
    races:      7,
    courseSlug: "chepstow",
    latest:     false,
  },
  {
    slug:       "chelmsford_aw_2-april-2026",
    date:       "2 April 2026",
    label:      "Chelmsford (AW) — 2 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "chelmsford-aw",
    latest:     false,
  },
  {
    slug:       "wincanton_1-april-2026",
    date:       "1 April 2026",
    label:      "Wincanton — 1 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "wincanton",
    latest:     false,
  },
  {
    slug:       "southwell_1-april-2026",
    date:       "1 April 2026",
    label:      "Southwell — 1 April 2026",
    going:      "Good",
    races:      6,
    courseSlug: "southwell",
    latest:     false,
  },
  {
    slug:       "sedgefield_1-april-2026",
    date:       "1 April 2026",
    label:      "Sedgefield — 1 April 2026",
    going:      "Soft",
    races:      6,
    courseSlug: "sedgefield",
    latest:     false,
  },
  {
    slug:       "kempton_aw_1-april-2026",
    date:       "1 April 2026",
    label:      "Kempton (AW) — 1 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "kempton-aw",
    latest:     false,
  },
  {
    slug:       "dundalk_aw_1-april-2026",
    date:       "1 April 2026",
    label:      "Dundalk (AW) — 1 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "dundalk-aw",
    latest:     false,
  },
  {
    slug:       "wolverhampton_aw_31-march-2026",
    date:       "31 March 2026",
    label:      "Wolverhampton (AW) — 31 March 2026",
    going:      "Good",
    races:      7,
    courseSlug: "wolverhampton-aw",
    latest:     false,
  },
  {
    slug:       "newcastle_31-march-2026",
    date:       "31 March 2026",
    label:      "Newcastle — 31 March 2026",
    going:      "Soft",
    races:      7,
    courseSlug: "newcastle",
    latest:     false,
  },
  {
    slug:       "limerick_31-march-2026",
    date:       "31 March 2026",
    label:      "Limerick — 31 March 2026",
    going:      "Heavy",
    races:      7,
    courseSlug: "limerick",
    latest:     false,
  },
  {
    slug:       "bangor-on-dee_31-march-2026",
    date:       "31 March 2026",
    label:      "Bangor-on-Dee — 31 March 2026",
    going:      "Good",
    races:      6,
    courseSlug: "bangor-on-dee",
    latest:     false,
  },
  {
    slug:       "wolverhampton_aw_30-march-2026",
    date:       "30 March 2026",
    label:      "Wolverhampton (AW) — 30 March 2026",
    going:      "Good",
    races:      7,
    courseSlug: "wolverhampton-aw",
    latest:     false,
  },
  {
    slug:       "navan_30-march-2026",
    date:       "30 March 2026",
    label:      "Navan — 30 March 2026",
    going:      "Heavy",
    races:      7,
    courseSlug: "navan",
    latest:     false,
  },
  {
    slug:       "ludlow_30-march-2026",
    date:       "30 March 2026",
    label:      "Ludlow — 30 March 2026",
    going:      "Good",
    races:      6,
    courseSlug: "ludlow",
    latest:     false,
  },
  {
    slug:       "kempton_aw_30-march-2026",
    date:       "30 March 2026",
    label:      "Kempton (AW) — 30 March 2026",
    going:      "Good",
    races:      7,
    courseSlug: "kempton-aw",
    latest:     false,
  },
  {
    slug:       "downpatrick_29-march-2026",
    date:       "29 March 2026",
    label:      "Downpatrick — 29 March 2026",
    going:      "Soft",
    races:      7,
    courseSlug: "downpatrick",
    latest:     false,
  },
  {
    slug:       "doncaster_29-march-2026",
    date:       "29 March 2026",
    label:      "Doncaster — 29 March 2026",
    going:      "Soft",
    races:      8,
    courseSlug: "doncaster",
    latest:     false,
  },
  {
    slug:       "ascot_29-march-2026",
    date:       "29 March 2026",
    label:      "Ascot — 29 March 2026",
    going:      "Good",
    races:      7,
    courseSlug: "ascot",
    latest:     false,
  },
  {
    slug:       "kempton_aw_28-march-2026",
    date:       "28 March 2026",
    label:      "Kempton (AW) — 28 March 2026",
    going:      "Good",
    races:      7,
    courseSlug: "kempton-aw",
    latest:     false,
  },
  {
    slug:       "uttoxeter_28-march-2026",
    date:       "28 March 2026",
    label:      "Uttoxeter — 28 March 2026",
    going:      "Soft",
    races:      7,
    courseSlug: "uttoxeter",
    latest:     false,
  },
  {
    slug:       "stratford_28-march-2026",
    date:       "28 March 2026",
    label:      "Stratford — 28 March 2026",
    going:      "Good",
    races:      7,
    courseSlug: "stratford",
    latest:     false,
  },
  {
    slug:       "southwell_aw_28-march-2026",
    date:       "28 March 2026",
    label:      "Southwell (AW) — 28 March 2026",
    going:      "Good",
    races:      8,
    courseSlug: "southwell-aw",
    latest:     false,
  },
  {
    slug:       "doncaster_28-march-2026",
    date:       "28 March 2026",
    label:      "Doncaster — 28 March 2026",
    going:      "Soft",
    races:      8,
    courseSlug: "doncaster",
    latest:     false,
  },
  {
    slug:       "curragh_28-march-2026",
    date:       "28 March 2026",
    label:      "Curragh — 28 March 2026",
    going:      "Heavy",
    races:      8,
    courseSlug: "curragh",
    latest:     false,
  },
  {
    slug:       "wetherby_27-march-2026",
    date:       "27 March 2026",
    label:      "Wetherby — 27 March 2026",
    going:      "Good",
    races:      7,
    courseSlug: "wetherby",
    latest:     false,
  },
  {
    slug:       "newcastle_aw_27-march-2026",
    date:       "27 March 2026",
    label:      "Newcastle (AW) — 27 March 2026",
    going:      "Good",
    races:      9,
    courseSlug: "newcastle-aw",
    latest:     false,
  },
  {
    slug:       "lingfield_aw_27-march-2026",
    date:       "27 March 2026",
    label:      "Lingfield (AW) — 27 March 2026",
    going:      "Good",
    races:      7,
    courseSlug: "lingfield-aw",
    latest:     false,
  },
  {
    slug:       "fontwell_27-march-2026",
    date:       "27 March 2026",
    label:      "Fontwell — 27 March 2026",
    going:      "Good",
    races:      6,
    courseSlug: "fontwell",
    latest:     false,
  },
  {
    slug:       "dundalk_aw_27-march-2026",
    date:       "27 March 2026",
    label:      "Dundalk (AW) — 27 March 2026",
    going:      "Good",
    races:      7,
    courseSlug: "dundalk-aw",
    latest:     false,
  },
];
const JUMPS_ONLY_COURSES = new Set([
  "aintree", "bangor-on-dee", "carlisle", "cheltenham", "clonmel",
  "downpatrick", "exeter", "fairyhouse", "fakenham", "fontwell",
  "hereford", "hexham", "huntingdon", "kelso", "kilbeggan",
  "ludlow", "market-rasen", "newton-abbot", "perth", "plumpton",
  "punchestown", "sedgefield", "stratford", "taunton", "tramore",
  "uttoxeter", "wetherby", "wexford", "wincanton", "bellewstown",
]);

type Surface = "all-weather" | "jumps" | "flat";

function classifySurface(m: Meeting): Surface {
  if (m.courseSlug.endsWith("-aw")) return "all-weather";
  if (JUMPS_ONLY_COURSES.has(m.courseSlug)) return "jumps";
  return "flat";
}

const SURFACE_LABELS: Record<Surface, string> = {
  "flat": "Flat & Dual-Purpose Turf",
  "jumps": "Jumps",
  "all-weather": "All-Weather",
};

const SURFACE_ORDER: Surface[] = ["flat", "jumps", "all-weather"];

/* ─────────────────────────────────────────────────────────────
   Date helpers
   ───────────────────────────────────────────────────────────── */

function parseDateString(s: string): Date {
  // "15 May 2026" → Date
  return new Date(s.split(" ").reverse().join(" "));
}

function toISODate(s: string): string {
  // "15 May 2026" → "2026-05-15" for date picker comparison
  const d = parseDateString(s);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

/* ─────────────────────────────────────────────────────────────
   Recent-days grouping (top section)
   ───────────────────────────────────────────────────────────── */

function groupRecent(meetings: Meeting[], days = 7) {
  const cutoff = new Date();
  cutoff.setHours(0, 0, 0, 0);
  cutoff.setDate(cutoff.getDate() - (days - 1));

  const recent = meetings.filter(m => parseDateString(m.date) >= cutoff);

  const now = new Date();
  const months = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];
  const today     = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  const yd        = new Date(now); yd.setDate(now.getDate() - 1);
  const yesterday = `${yd.getDate()} ${months[yd.getMonth()]} ${yd.getFullYear()}`;
  const tm        = new Date(now); tm.setDate(now.getDate() + 1);
  const tomorrow  = `${tm.getDate()} ${months[tm.getMonth()]} ${tm.getFullYear()}`;

  const groups: Record<string, Meeting[]> = {};
  for (const m of recent) {
    const key = m.date === tomorrow ? "__tomorrow__"
              : m.date === today ? "__today__"
              : m.date === yesterday ? "__yesterday__"
              : m.date;
    if (!groups[key]) groups[key] = [];
    groups[key].push(m);
  }

  const order = Object.keys(groups).sort((a, b) => {
    const rank = (k: string) =>
      k === "__tomorrow__" ? -3
      : k === "__today__" ? -2
      : k === "__yesterday__" ? -1
      : parseDateString(k).getTime() * -1;
    return rank(a) - rank(b);
  });

  return order.map(key => ({
    label: key === "__tomorrow__"  ? "Tomorrow"
         : key === "__today__"     ? "Today"
         : key === "__yesterday__" ? "Yesterday"
         : key,
    meetings: groups[key],
  }));
}

/* ─────────────────────────────────────────────────────────────
   Course grouping (main section)
   ───────────────────────────────────────────────────────────── */

type CourseGroup = {
  courseSlug: string;
  courseName: string;
  surface: Surface;
  meetings: Meeting[];
};

function groupByCourse(meetings: Meeting[]): Record<Surface, CourseGroup[]> {
  const byCourse: Record<string, CourseGroup> = {};

  for (const m of meetings) {
    const courseName = m.label.split(" \u2014 ")[0];
    if (!byCourse[m.courseSlug]) {
      byCourse[m.courseSlug] = {
        courseSlug: m.courseSlug,
        courseName,
        surface: classifySurface(m),
        meetings: [],
      };
    }
    byCourse[m.courseSlug].meetings.push(m);
  }

  // Sort meetings within each course (newest first)
  for (const slug in byCourse) {
    byCourse[slug].meetings.sort(
      (a, b) => parseDateString(b.date).getTime() - parseDateString(a.date).getTime()
    );
  }

  const bySurface: Record<Surface, CourseGroup[]> = {
    "flat": [],
    "jumps": [],
    "all-weather": [],
  };

  for (const slug in byCourse) {
    bySurface[byCourse[slug].surface].push(byCourse[slug]);
  }

  // Sort courses alphabetically within each surface
  for (const surface of SURFACE_ORDER) {
    bySurface[surface].sort((a, b) => a.courseName.localeCompare(b.courseName));
  }

  return bySurface;
}

/* ─────────────────────────────────────────────────────────────
   Inline styles (matched to existing aesthetic)
   ───────────────────────────────────────────────────────────── */

const styles = {
  mono: { fontFamily: "'DM Mono',monospace" },
  bebas: { fontFamily: "'Bebas Neue',sans-serif" },
  input: {
    fontFamily: "'DM Mono',monospace",
    fontSize: "0.72rem",
    padding: "9px 12px",
    background: "#0D1B2A",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "5px",
    color: "var(--cream)",
    outline: "none",
    minWidth: "0",
  } as React.CSSProperties,
  card: (latest?: boolean) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "13px 18px",
    background: latest ? "rgba(201,168,76,0.055)" : "rgba(255,255,255,0.025)",
    border: latest ? "1px solid rgba(201,168,76,0.2)" : "1px solid rgba(255,255,255,0.07)",
    borderRadius: "7px",
    flexWrap: "wrap" as const,
    gap: "8px",
  }),
};

/* ─────────────────────────────────────────────────────────────
   Meeting row (shared between recent + course sections)
   ───────────────────────────────────────────────────────────── */

function MeetingRow({ m, showCourse = true }: { m: Meeting; showCourse?: boolean }) {
  const course = m.label.split(" \u2014 ")[0];
  return (
    <div style={styles.card(m.latest)}>
      <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap", flex: 1 }}>
        {showCourse ? (
          <Link href={`/courses/${m.courseSlug}`}
            style={{ fontWeight: 600, fontSize: "0.88rem", color: "var(--gold)", textDecoration: "none" }}>
            {course}
          </Link>
        ) : (
          <span style={{ ...styles.mono, fontSize: "0.72rem", color: "rgba(245,240,232,0.7)", minWidth: "110px" }}>
            {m.date}
          </span>
        )}
        <span style={{ ...styles.mono, fontSize: "0.6rem", color: "rgba(245,240,232,0.35)" }}>
          {m.going}
        </span>
        <span style={{ ...styles.mono, fontSize: "0.6rem", color: "rgba(245,240,232,0.35)" }}>
          {m.races} races
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {m.latest && (
          <span style={{ ...styles.mono, fontSize: "0.56rem", padding: "2px 7px", borderRadius: "3px",
            background: "rgba(201,168,76,0.15)", color: "var(--gold)",
            border: "0.5px solid rgba(201,168,76,0.3)" }}>
            Latest
          </span>
        )}
        <Link href={`/meetings/${m.slug}`}
          style={{ ...styles.mono, fontSize: "0.58rem", letterSpacing: "0.07em", textTransform: "uppercase",
            padding: "3px 9px", borderRadius: "3px",
            background: "rgba(255,255,255,0.05)", color: "rgba(245,240,232,0.45)", textDecoration: "none" }}>
          View →
        </Link>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Course block with internal pagination
   ───────────────────────────────────────────────────────────── */

const PER_PAGE = 10;

function CourseBlock({ group }: { group: CourseGroup }) {
  const [expanded, setExpanded] = useState(false);
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(group.meetings.length / PER_PAGE));
  const pageStart = (page - 1) * PER_PAGE;
  const pageMeetings = group.meetings.slice(pageStart, pageStart + PER_PAGE);
  const mostRecent = group.meetings[0]?.date;

  return (
    <div style={{ marginBottom: "12px",
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "7px",
      overflow: "hidden" }}>

      <button
        onClick={() => setExpanded(v => !v)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 18px", background: "transparent", border: "none",
          cursor: "pointer", textAlign: "left", color: "var(--cream)" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
          <span style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--gold)" }}>
            {group.courseName}
          </span>
          <span style={{ ...styles.mono, fontSize: "0.58rem", color: "rgba(245,240,232,0.35)" }}>
            {group.meetings.length} meeting{group.meetings.length !== 1 ? "s" : ""}
          </span>
          {mostRecent && (
            <span style={{ ...styles.mono, fontSize: "0.58rem", color: "rgba(245,240,232,0.25)" }}>
              last: {mostRecent}
            </span>
          )}
        </div>
        <span style={{ ...styles.mono, fontSize: "0.7rem", color: "rgba(245,240,232,0.4)" }}>
          {expanded ? "−" : "+"}
        </span>
      </button>

      {expanded && (
        <div style={{ padding: "0 14px 14px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {pageMeetings.map(m => (
            <MeetingRow key={m.slug} m={m} showCourse={false} />
          ))}

          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px",
              marginTop: "8px", paddingTop: "10px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                style={{ ...styles.mono, fontSize: "0.6rem", padding: "4px 10px", borderRadius: "3px",
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  color: page === 1 ? "rgba(245,240,232,0.15)" : "rgba(245,240,232,0.5)",
                  cursor: page === 1 ? "not-allowed" : "pointer" }}>
                ← Prev
              </button>
              <span style={{ ...styles.mono, fontSize: "0.6rem", color: "rgba(245,240,232,0.4)" }}>
                {page} / {totalPages}
              </span>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                style={{ ...styles.mono, fontSize: "0.6rem", padding: "4px 10px", borderRadius: "3px",
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  color: page === totalPages ? "rgba(245,240,232,0.15)" : "rgba(245,240,232,0.5)",
                  cursor: page === totalPages ? "not-allowed" : "pointer" }}>
                Next →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Page
   ───────────────────────────────────────────────────────────── */

export default function ArchivePage() {
  const [courseFilter, setCourseFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const courseOptions = useMemo(() => {
    const seen = new Map<string, string>();
    for (const m of MEETINGS) {
      const name = m.label.split(" \u2014 ")[0];
      if (!seen.has(m.courseSlug)) seen.set(m.courseSlug, name);
    }
    return Array.from(seen.entries())
      .map(([slug, name]) => ({ slug, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const filtered = useMemo(() => {
    return MEETINGS.filter(m => {
      if (courseFilter && m.courseSlug !== courseFilter) return false;
      if (dateFilter && toISODate(m.date) !== dateFilter) return false;
      return true;
    });
  }, [courseFilter, dateFilter]);

  const isFiltering = courseFilter !== "" || dateFilter !== "";
  const recent = useMemo(() => groupRecent(filtered, 7), [filtered]);
  const bySurface = useMemo(() => groupByCourse(filtered), [filtered]);

  return (
    <>
      <div className="wrap">

        {/* Header */}
        <div style={{ marginBottom: "32px", paddingBottom: "24px",
          borderBottom: "1px solid rgba(201,168,76,0.18)" }}>
          <p style={{ ...styles.mono, fontSize: "0.6rem", textTransform: "uppercase",
            letterSpacing: "0.12em", color: "rgba(245,240,232,0.35)", marginBottom: "8px" }}>
            Meeting Archive
          </p>
          <h1 style={{ ...styles.bebas, fontSize: "2.2rem", color: "var(--cream)", marginBottom: "8px" }}>
            All Pace Maps
          </h1>
          <p style={{ fontSize: "0.8rem", color: "rgba(245,240,232,0.4)",
            lineHeight: 1.7, maxWidth: "480px" }}>
            Every meeting published on PaceMap — permanently accessible for reference and research.
          </p>
          <p style={{ ...styles.mono, fontSize: "0.6rem", color: "rgba(245,240,232,0.25)", marginTop: "10px" }}>
            {MEETINGS.length} meeting{MEETINGS.length !== 1 ? "s" : ""} published
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "32px" }}>
          <select
            value={courseFilter}
            onChange={e => setCourseFilter(e.target.value)}
            style={{ ...styles.input, flex: "1 1 200px" }}
          >
            <option value="" style={{ background: "#0D1B2A", color: "var(--cream)" }}>All courses</option>
            {courseOptions.map(c => (
              <option key={c.slug} value={c.slug} style={{ background: "#0D1B2A", color: "var(--cream)" }}>
                {c.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
            style={{ ...styles.input, flex: "1 1 180px" }}
          />
          {isFiltering && (
            <button
              onClick={() => { setCourseFilter(""); setDateFilter(""); }}
              style={{ ...styles.mono, fontSize: "0.6rem", letterSpacing: "0.07em",
                textTransform: "uppercase", padding: "9px 14px", borderRadius: "5px",
                background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)",
                color: "var(--gold)", cursor: "pointer" }}>
              Clear
            </button>
          )}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ ...styles.mono, fontSize: "0.72rem", color: "rgba(245,240,232,0.3)" }}>
              {isFiltering
                ? "No meetings match those filters."
                : "No meetings published yet — check back on a race day."}
            </p>
          </div>
        )}

        {/* Recent days (only when not filtering) */}
        {!isFiltering && recent.length > 0 && (
          <section style={{ marginBottom: "48px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
              <h2 style={{ ...styles.bebas, fontSize: "1.3rem", letterSpacing: "0.06em",
                color: "var(--cream)", margin: 0 }}>
                Recent Days
              </h2>
              <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
            </div>

            {recent.map(group => (
              <div key={group.label} style={{ marginBottom: "28px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "12px" }}>
                  <span style={{ ...styles.bebas, fontSize: "1rem", letterSpacing: "0.06em",
                    color: (group.label === "Today" || group.label === "Tomorrow")
                      ? "var(--gold)" : "rgba(245,240,232,0.55)" }}>
                    {group.label}
                  </span>
                  <div style={{ flex: 1, height: "1px",
                    background: (group.label === "Today" || group.label === "Tomorrow")
                      ? "rgba(201,168,76,0.2)" : "rgba(255,255,255,0.06)" }} />
                  <span style={{ ...styles.mono, fontSize: "0.58rem", color: "rgba(245,240,232,0.25)" }}>
                    {group.meetings.length} meeting{group.meetings.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {group.meetings.map(m => <MeetingRow key={m.slug} m={m} showCourse={true} />)}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* By course (always shown, surface-grouped) */}
        <section>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
            <h2 style={{ ...styles.bebas, fontSize: "1.3rem", letterSpacing: "0.06em",
              color: "var(--cream)", margin: 0 }}>
              {isFiltering ? "Results" : "Browse by Course"}
            </h2>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
            {isFiltering && (
              <span style={{ ...styles.mono, fontSize: "0.58rem", color: "rgba(245,240,232,0.35)" }}>
                {filtered.length} meeting{filtered.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {SURFACE_ORDER.map(surface => {
            const groups = bySurface[surface];
            if (groups.length === 0) return null;
            const count = groups.reduce((sum, g) => sum + g.meetings.length, 0);

            return (
              <div key={surface} style={{ marginBottom: "32px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                  <span style={{ ...styles.mono, fontSize: "0.62rem", letterSpacing: "0.1em",
                    textTransform: "uppercase", color: "rgba(245,240,232,0.55)" }}>
                    {SURFACE_LABELS[surface]}
                  </span>
                  <span style={{ ...styles.mono, fontSize: "0.55rem", color: "rgba(245,240,232,0.25)" }}>
                    {groups.length} course{groups.length !== 1 ? "s" : ""} · {count} meeting{count !== 1 ? "s" : ""}
                  </span>
                </div>

                {groups.map(g => <CourseBlock key={g.courseSlug} group={g} />)}
              </div>
            );
          })}
        </section>

      </div>
    </>
  );
}
