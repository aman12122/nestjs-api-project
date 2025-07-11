import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService, private prisma: PrismaService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET') || 'fallback-secret',
    });
  }

  async validate(payload: {
    sub: number,
    email: string, 
  }) {
    const user = await this.prisma.user.findUnique({
      where: { 
        id: payload.sub 
      },
    });

  const { hash, ...userWithoutHash } = user || {};
  return userWithoutHash;
  }
} 