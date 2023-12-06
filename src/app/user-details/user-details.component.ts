import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { GithubUser } from '../models/githubUser';
import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  user!: GithubUser;

  @ViewChild('followerChart') followerChart!: ElementRef;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    this._getUserDetails();
  }

  private _getUserDetails() {
    this.route.params.subscribe((params) => {
      const username = params['username'];
      this.userService.getUserDetails(username).subscribe((user) => {
        console.log(user);
        this.user = user;
        this.buildFollowerChart();
      });
    });
  }

  private buildFollowerChart() {
    if (this.user && this.user.followers) {
      const canvas = this.followerChart.nativeElement as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Followers'],
            datasets: [
              {
                label: 'Número de seguidores',
                data: [this.user.followers],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                type:'linear',
                beginAtZero: true,
              },
            },
          },
        });
      }
    }
  }
}
