import { BaseApi } from 'api/BaseApi';

export type ProjectItem = {
  id: number;
  title: string;
  discordLink: string;
};

export type SelectedProjectItemMap = Record<number, boolean>;

export class ProjectApi extends BaseApi {
  static getProjects(searchedText?: string) {
    return this.http.get<{
      projectItems: ProjectItem[];
    }>(`${this.url}/projects${searchedText ? `?q=${searchedText}` : ''}`);
  }

  static getUserSelectedProjects() {
    return this.http.get<{
      projectItems: ProjectItem[];
    }>(`${this.url}/projects/selected`);
  }

  static updateSubscribeProjects(data: { email: string; projectIds: number[]; optionProjects: string[] }) {
    return this.http.put(`${this.url}/projects/subscribe`, data);
  }

  static subscribeProjects(data: { email: string; projectIds: number[]; optionProjects: string[] }) {
    return this.http.post(`${this.url}/projects/subscribe`, data);
  }

  static confirmSubscribeProjects(data: { token: string }) {
    return this.http.post<{ token: string }, object>(`${this.url}/projects/confirm-subscribe`, data);
  }
}
