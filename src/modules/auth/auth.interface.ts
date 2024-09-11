export interface ILoginUser {
  id: string
  password: string
}

export interface IJwt {
  userId: string
  role: 'student' | 'faculty' | 'admin'
}
