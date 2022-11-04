import * as request from 'supertest';

const newUser = {
  name: 'joao',
  email: 'lucassalicano@test.com',
  password: 123,
  joinDate: '2022-01-01',
};

const userResponse = {
  name: 'joao',
  email: 'lucassalicano@test.com',
  joinDate: '2022-01-01',
};

test('/POST Users', async () => {
  await request('http://localhost:3000')
    .post('/users')
    .send(newUser)
    .expect(201, userResponse);
});

test('/GET User by Name', async() => {
  await request('http://localhost:3000')
  .get('/users/joao')
  .send()
  .expect(200, userResponse);
})
