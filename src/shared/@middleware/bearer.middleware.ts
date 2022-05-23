import { HttpService } from '@nestjs/axios';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class BearerMiddleware implements NestMiddleware {
  constructor(private readonly httpService: HttpService) {}
  use(req: Request, res: Response, next: () => void) {
    this.httpService.axiosRef.interceptors.request.use((res) => {
      res.headers = {
        ...res.headers,
        Authorization:
          req.headers['Authorization'] ||
          'v^1.1#i^1#I^3#f^0#r^0#p^1#t^H4sIAAAAAAAAAOVYaWwUVRzvbg9SK60aUsAobAdRC87sHDt7jO2abQvpBnrQXaCtEpzjTXfY2Zll5g3bVTS1iQSPaDiaGA9OE4IB0Q8W/YCRCF6J4geMB4YjQjSNCVFACtHo29lSthWhtGts4nyZvPf+7//+v9/7H+89sqekdN66xnUXpzqmOLf1kD1Oh4MqI0tLiueXFzrvLC4gcwQc23ru6SnqLfypxuQTapJrA2ZS10zg6k6omsnZnbWYZWiczpuKyWl8ApgcFLlIqGkxRxMklzR0qIu6irnCDbWYyMusj/YE/DxDyX4fQL3aFZ1RHY2zlCSDAAVEVhbFgBeNm6YFwpoJeQ3WYjRJ0zjJ4jQTJVmOZTjSS/h9VCfmWgYMU9E1JEKQWNA2l7PnGjm2Xt9U3jSBAZESLBgOLYy0hMINC5qjNe4cXcEhHiKQh5Y5slWvS8C1jFctcP1lTFuai1iiCEwTcwezK4xUyoWuGDMO822qeTrgpX2MnyYDrBgQQF6oXKgbCR5e345MjyLhsi3KAQ0qMH0jRhEbwiogwqFWM1IRbnBlfkssXlVkBRi12IK6UEeotRUL8mYspWhtuMAbkDfwSF07Lgse1iPzsgenKS9A/sUPrZJVNcTxqGXqdU1SMoyZrmYd1gFkMhhNjCeHGCTUorUYIRlmzMmV810h0Mt2ZnY0u4UWjGmZTQUJxILLbt6Y/uHZEBqKYEEwrGH0gM0P2uhkUpGw0YO2Iw75TrdZi8UgTHJudyqVIlIMoRtdbpokKXd70+KIGAMJHsvKZmIdySs3noArNhQRORaS52A6iWzpRo6KDNC6sCDj91O+wBDvI80Kju79W0cOZvfIcMhXeIik3++VAE0xHo9AM3I+wiM45KHujB1A4NN4gjfiACZVXgS4iPzMSgBDkTiGlWnGLwNc8gZk3BOQZVxgJS9OyQCQAAiCGPD/b6JkrH4eAaIBYL4cPT9ObsaoTq831RCen9ZI4G73C3Xd0eWraaulEagxMtygxdVVa9QlqVRH7VhD4Zrg61UFMRNF6+ePgEys54OERt2EQJoQvIioJ0GrripienJtMGNIrSh+0nVWGrUjQFXRb0JQQ8lkOG/pOj8gbyZTjA90XmvUf1GfronKzHjt5EKVmW8iBXxSITIViBD1hFvnrUysw1ime6VtteufBHOF3IKVJrosYEJkiYSOf2OepKBMTqBiJo19SrZUIhBjn4LuFpIlwnEtZNdkArGpdMWgeVNrdk+EFMFS4xNyOgXdGSaVyyG4WdyKlD3sEzZ4wlwjEgYwdctA9xyiJXP8jepxoKHzBDR0VQXGMmrCmTSRsCAvqGCypdQ8ZBeFH+dhp6jX8f6/hYvysgztZym/d0LYRPs4s3Ky1YS8FsKbuNK4R76uBAvsj+p1HCB7He85HQ7SR+LUfLK6pHBpUeGtmIlSCWHymiTo3YTCywTKYhoPLQMQcZBO8orhLHEo3x0VB3PedbatIGcMv+yUFlJlOc885F1XR4qpiulTaZpkaYZkWYb0dpJzro4WUZVF09oZ9ZtXGw8NPlHcf+p13+Dl36ccFcipw0IOR3EBcsKC1Y8eq7s4a3/bwKZdO5/b6nhyXf+FC075JF194uX+0oN15e3i4a13NwRvcb67fvfX/lnO6tn6xt9iLzTV4PGBM+Un1lbtqZhW/VZgn/r4w5fMs3tf88ODhd7iZ/54cPtjp3ce3Yu9OSPepwzM+PH8gOujRTMPv7SluGPTxqZXOnYcaDj1KVtxf9+LZd9+SbQuf6BS3P7B5SMzzzirCoqK+uaWnR287bPKRW9Esb4d5z/euMpKtvSf/CVO1vfO2XDfoZ+XNr+z81nPn0zb8/dumD73yLm9x/arP3y+/tddT3d8cmn38T17Znuitz/FVWx+qL/818CHVV99se/4ic1vb5W/37L2jsr0vEfqq6ZpK06fq8lu419qcZEicRMAAA==',
      };
      return res;
    });
    next();
  }
}
