import { EntityRepository, Repository } from 'typeorm';
import { User } from '../domain/entity/User';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  // Custom Repository Functions go here.
}
