const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const User = require('../models/users')

describe('With one user in the database', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('rootpassword', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('Addition of user with a unique username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'MDM69',
        name: 'Maximo Della Maggiore',
        password: 'supermaxi',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      assert(usernames.includes(newUser.username))
    })

    test('Fails with short and missing username or password', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUserMissing = {
          username: 'Long enough',
          name: 'Maximo Della Maggiore',
        }

        const newUserShort = {
            username: 'MD',
            name: 'Maximo Della Maggiore',
            password: 'supermaxi',
          }
    
        await api
          .post('/api/users')
          .send(newUserMissing)
          .expect(400)
          .expect('Content-Type', /application\/json/)
        
        await api
          .post('/api/users')
          .send(newUserShort)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    
        const usernames = usersAtEnd.map(u => u.username)
        assert(!(usernames.includes(newUserMissing.username)))
        assert(!(usernames.includes(newUserShort.username)))
      })
  })


after(async () => {
    mongoose.connection.close()
})