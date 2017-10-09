for (let i = 0; i < 100; i++) {
  db.users.insert({
    applicationDate: new Date(),
    fullName: 'Fresher No.' + i,
    dob: new Date(),
    gender: i % 2 == 0 ? 'Male' : 'Female',
    phone: '0939939939',
    email: 'fresher.no' + i + '@gmail.com',
    university: 'PTIT',
    major: 'IT',
    channel: 'Career link',
    skill: 'ABAP',
    note: 'Some note made by the recruiter or interviewer',
    foreignLanguage: [
      {
        lang: 'English',
        level: '800 Toeic'
      },
      {
        lang: 'Japanese',
        level: 'N3'
      }
    ],
    entryTest: {
      date: null
    },
    role: 3,
    active: true,
    password: 'e9c4963bc81007eec195ae9521b91633fb81e3bc844e99f10e864f85b7bb7451fa8b5f0f1df8ffbb125e4ce63334b6f02Avbjdpkt/HXUvSnb+85Vg=='

  })
}
db.users.insert({
  fullName: 'Admin',
  email: 'admin@lion.com',
  active: true,
  password: 'e9c4963bc81007eec195ae9521b91633fb81e3bc844e99f10e864f85b7bb7451fa8b5f0f1df8ffbb125e4ce63334b6f02Avbjdpkt/HXUvSnb+85Vg=='
})