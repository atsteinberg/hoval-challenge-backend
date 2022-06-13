export enum DeviceType {
  HeatingCircuit = 'HeatingCircuit',
  CoolingCircuit = 'CoolingCircuit',
}

export enum ErrorStatus {
  Unread = 'Unread',
  Read = 'Read',
  Acknowledged = 'Acknowledged',
}

export enum WeekDay {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}

export enum UserInteractionType {
  NameChange = 'NameChange',
  TargetTemperatureChange = 'TargetTemperatureChange',
}
