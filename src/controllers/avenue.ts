import { Request, Response } from "express";
import { UpdateOptions, DestroyOptions } from "sequelize";
import { Avenue, AvenueInterface } from "../models/avenue";

class AvenueController {
  public index(req: Request, res: Response) {
    Avenue.findAll<Avenue>({})
      .then((avenues: Array<Avenue>) => res.json(avenues))
      .catch((err: Error) => res.status(500).json(err));
  }

  public fetch(req: Request, res: Response) {
    const avenueId: string = req.params.id;
    Avenue.findByPk<Avenue>(avenueId)
      .then((avenue: Avenue | null) => {
        if (avenue) {
          res.json(avenue);
        } else {
          res.status(404).json({ errors: ["Avenue not found"] });
        }
      })
      .catch((err: Error) => res.status(500).json(err));
  }

  public create(req: Request, res: Response) {
    const params: AvenueInterface = req.body;
    if (
      (!!params.has_cycle_track && !!params.cycle_track_extension_km) ||
      (!params.has_cycle_track && !params.cycle_track_extension_km)
    ) {
      const dataToSave = {
        ...params,
        percent_cycle_track_km: params.has_cycle_track
          ? `${Number(
              (params.cycle_track_extension_km / params.extension_km) * 100
            ).toFixed(2)}%`
          : "0%",
      };
      Avenue.create<Avenue>(dataToSave)
        .then((avenue: Avenue) => res.status(201).json(avenue))
        .catch((err: Error) => res.status(500).json(err));
    } else {
      res.status(422).json({
        data: "has_cycle_track need make sense with cycle_track_extension_km",
      });
    }
  }

  public update(req: Request, res: Response) {
    const avenueId: string = req.params.id;
    const params: AvenueInterface = req.body;
    if (
      (!!params.has_cycle_track && !!params.cycle_track_extension_km) ||
      (!params.has_cycle_track && !params.cycle_track_extension_km)
    ) {
      const update: UpdateOptions = {
        where: { id: avenueId },
        limit: 1,
      };

      const new_percent_cycle_track_km = params.has_cycle_track
      ? `${Number(
          (params.cycle_track_extension_km / params.extension_km) * 100
        ).toFixed(2)}%`
      : "0%";

      const dataToSave = {
        ...params,
        percent_cycle_track_km: new_percent_cycle_track_km,
      };
      
      Avenue.update(dataToSave, update)
        .then(() => res.status(202).json({ data: "success" }))
        .catch((err: Error) => res.status(500).json(err));
    } else {
      res.status(422).json({
        data: "has_cycle_track need make sense with cycle_track_extension_km",
      });
    }
  }

  public delete(req: Request, res: Response) {
    const avenueId: string = req.params.id;
    const options: DestroyOptions = {
      where: { id: avenueId },
      limit: 1,
    };

    Avenue.destroy(options)
      .then(() => res.status(204).json({ data: "success" }))
      .catch((err: Error) => res.status(500).json(err));
  }
}

export default new AvenueController();
