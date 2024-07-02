type MonthType =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export interface IAcademicSemester {
  name: 'Autumn' | 'Summer' | 'Fall'
  code: '01' | '02' | '03'
  year: string
  startMonth: MonthType
  endMonth: MonthType
}

export interface IAcademicSemesterMapper {
  [key: string]: string
}
