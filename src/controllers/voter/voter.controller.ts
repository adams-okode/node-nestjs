import { Controller, Get, Post, Body, Param, Put, Query, Response } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { VoterDto } from '../../dtos/voter/voter.dto';
import { GeneralResponse } from '../../dtos/responses/response';
import { VoterService } from '../../services/voter/voter.service';
import { VoterEntity } from 'src/entities';
import { type } from 'os';


@Controller('voter')
@ApiTags('voter')
export class VoterController {

    constructor(private voterService: VoterService) { }


    @Post()
    @ApiBody({
        type: VoterDto
    })
    async createVoter(@Body() voterDto: VoterDto) {
        let data: VoterEntity = await this.voterService.create(voterDto);

        let gen: GeneralResponse<VoterEntity> = new GeneralResponse(200, 'Success', data);
        return gen;

    }


    @Get()
    @ApiParam({ name: 'id' })
    async findOneVoter(@Param() id: number) {
        return this.voterService.findOne(id)
    }

    @Get('/all')
    async findAllVoters() {
        return this.voterService.findAll()
    }

    @Put()
    @ApiQuery({ name: 'id' })
    @ApiBody({
        type: VoterDto
    })
    async updateVoter(@Query() id: number, @Body() voterDto: VoterDto) {

        return this.updateVoter(id, voterDto);

    }

}
