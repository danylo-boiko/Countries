import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../../entities/user.entity";
import * as bcrypt from 'bcrypt';
import { Repository } from "typeorm";
import { JwtPayload } from "../../../auth/interfaces/jwt-payload.interface";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async findByUsername(username: string): Promise<User> {
        const storedUser = await this.userRepository.findOne({ where: { username } });

        if (!storedUser) {
            throw new HttpException(`User with username ${username} not found`, HttpStatus.UNAUTHORIZED);
        }

        return storedUser;
    }

    async findByPayload(jwtPayload: JwtPayload): Promise<User> {
        const storedUser = await this.userRepository.findOne({ where: { username: jwtPayload.username } });

        if (!storedUser) {
            throw new HttpException(`Invalid payload ${jwtPayload}`, HttpStatus.UNAUTHORIZED);
        }

        return storedUser;
    }

    async create(username: string, password: string): Promise<User> {
        const storedUser = await this.userRepository.findOne({ where: { username } });

        if (storedUser) {
            throw new HttpException(`User with username ${username} already exists`, HttpStatus.BAD_REQUEST);
        }

        const createdUser: User = this.userRepository.create({
            username,
            hashedPassword: await bcrypt.hash(password, 10)
        })

        await this.userRepository.save(createdUser);

        return createdUser;
    }
}
