# Alsun Yearbook

An online yearbook created for my college, Alsun, Ain Shams. Includes a display
of students and professors, a messaging system, a dashboard to manage the users
and track the data.

![Yearbook Heading](/public//images/heading.png)

---

## Set up

After cloning the code you need to install the dependencies. You can use `npm` but it's advisable to use `pnpm`.

```bash
pnpm i # or npm i
```

Create [`.env`](#env) file in the root directory to configure the project.

Build and start the app

```bash
pnpm build # or npm run build
pnpm start # or npm start
```

### Env

#### It should include

- `DB_URI` to configure the db. Expects a mongodb database link.
- `JWT_SECRET` access token secret.
- `REFRESH_TOKEN_SECRET` refresh token secret.
- `CLOUDINARY_NAME` cloudinary name for the images.
- `CLOUDINARY_KEY` cloudinary key.
- `CLOUDINARY_SECRET` cloudinary secret.

```env
DB_URI=

JWT_SECRET=
REFRESH_TOKEN_SECRET=

CLOUDINARY_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
```
