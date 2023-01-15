import { PLayerOptions, TextQue } from "../voice/wordsQue"

export const guildArray:{
    [guildId:string]: TextQue[]
} = {}

export const playerArray:{
    [guildID:string]: PLayerOptions
} = {}

export const pitchArray:{
    [userId:string]: number
} = {}

export const wordsArray:{
    [guildId:string]: {
        [key: string]: string;
    }[]
} = {}