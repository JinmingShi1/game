export const answers = [{ // Chris Wagner
  '2014-2015': ["ANA"],
  '2015-2016': ["ANA", "COL"],
  '2016-2017': ["ANA"],
  '2017-2018': ["ANA", "NYI"],
  '2018-2019': ["BOS"],
  '2019-2020': ["BOS"],
  '2020-2021': ["BOS"],
  '2021-2022': ["BOS"],
  '2022-2023': ["BOS"]
}, { // Ross Johnston
  '2015-2016': ["NYI"],
  '2016-2017': ["NYI"],
  '2017-2018': ["NYI"],
  '2018-2019': ["NYI"],
  '2020-2021': ["NYI"],
  '2021-2022': ["NYI"],
  '2022-2023': ["NYI"],
}, { // Shane Prince
  '2014-2015': ["OTT"],
  '2015-2016': ["NYI", "OTT"],
  '2016-2017': ["NYI"],
  '2017-2018': ["NYI"]
}, { // Anders Lee
  '2012-2013': ["NYI"],
  '2013-2014': ["NYI"],
  '2014-2015': ["NYI"],
  '2015-2016': ["NYI"],
  '2016-2017': ["NYI"],
  '2017-2018': ["NYI"],
  '2018-2019': ["NYI"],
  '2020-2021': ["NYI"],
  '2021-2022': ["NYI"],
  '2022-2023': ["NYI"],
}];

export const dateFormatter = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return (`${year}-${month}-${day}`);
}
  
