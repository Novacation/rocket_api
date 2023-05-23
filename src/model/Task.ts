export class Task {
  private _id: number;
  private _title: string;
  private _description: string;
  private _completed_at: Date;
  private _created_at: Date;
  private _updated_at: Date;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get completed_at(): Date {
    return this._completed_at;
  }

  set completed_at(value: Date) {
    this._completed_at = value;
  }

  get created_at(): Date {
    return this._created_at;
  }

  set created_at(value: Date) {
    this._created_at = value;
  }

  get updated_at(): Date {
    return this._updated_at;
  }

  set updated_at(value: Date) {
    this._updated_at = value;
  }
}
