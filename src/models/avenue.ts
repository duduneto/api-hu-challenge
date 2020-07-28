import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";

export class Avenue extends Model {
  public id!: number;
  public name!: string;
  public extension_km!: number;
  public has_cycle_track!: boolean;
  public cycle_track_extension_km: number | null;
  public percent_cycle_track_km: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export interface AvenueInterface {
  name: string;
  extension_km: number;
  has_cycle_track: boolean;
  cycle_track_extension_km: number;
  percent_cycle_track_km: number;
}

Avenue.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    extension_km: {
      type: new DataTypes.NUMBER,
      allowNull: false
    },
    cycle_track_extension_km: {
      type: new DataTypes.NUMBER,
      defaultValue: 0
    },
    has_cycle_track: {
      type: new DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    percent_cycle_track_km: {
      type: new DataTypes.STRING(20),
      defaultValue: 0
    },
  },
  {
    tableName: "avenues",
    sequelize: database // this bit is important
  }
);
Avenue.sync({ force: true }).then(() => console.log("Avenue table created"));