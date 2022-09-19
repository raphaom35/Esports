import express from "express";
import cors from 'cors';
import {PrismaClient} from '@prisma/client'

import { convertHourStringToMinutes } from "./utils/convert-hour-string-to-minutes";
import { convertMinutesToHourString } from "./utils/convert-minutes-to-hour-string";
const app = express();

app.use(express.json());
app.use(cors());
const prisma = new PrismaClient({
  log:['query']
});

app.get("/games", async (req, res) => {
  const games =await prisma.game.findMany(
    {
      include:{_count:{select:{ads:true}}}
    }
  );
  return res.json(games);
});
app.post('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id;
  const body: any = request.body;
  console.log(gameId);
console.log(request.body);
  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearPlaying: body.yearPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hoursStars: convertHourStringToMinutes(body.hoursStart),
      hoursEnd: convertHourStringToMinutes(body.hoursEnd),
      userVoiceChannel: body.userVoiceChannel,
    },
  })

  return response.status(201).json(ad);
});

app.get('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      userVoiceChannel: true,
      yearPlaying: true,
      hoursStars: true,
      hoursEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return response.json(ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinutesToHourString(ad.hoursStars),
      hourEnd: convertMinutesToHourString(ad.hoursEnd),
    }
  }));
});

app.get("/ads/:id/discord", async (req, res) => {
  const asId= req.params.id;
  const ads =await prisma.ad.findUniqueOrThrow({
    select:{
      discord:true
    },where:{id:asId}
  })
  return res.json({
    discord:ads.discord
  });
});

app.listen(3333);


