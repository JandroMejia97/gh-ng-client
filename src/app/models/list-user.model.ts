import { GitHubUser } from './git-hub-user.model';

export type ListUser = Omit<
    GitHubUser,
    | 'name'
    | 'company'
    | 'blog'
    | 'location'
    | 'email'
    | 'hireable'
    | 'bio'
    | 'twitterUsername'
    | 'publicRepos'
    | 'publicGists'
    | 'followers'
    | 'following'
    | 'createdAt'
    | 'updatedAt'
  >;
