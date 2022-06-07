import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInput } from '../inputs/user.input';
import { User } from '../models/users.model';
import { UsersService } from '../services/users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  @Query(() => [User])
  getUsers() {
    return this.usersService.getAll();
  }

  @Query(() => User)
  getUser(@Args('id') id: string) {
    return this.usersService.getOne(id);
  }

  @Mutation(() => User)
  createUser(@Args('newUser') newUser: UserInput) {
    return this.usersService.createUser(newUser);
  }
}
