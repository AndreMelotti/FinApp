import { Controller, Get, Post, Patch, Param, Delete, ParseIntPipe } from "@nestjs/common"
import { UserSettingsService } from "./user-settings.service"
import type { CreateUserSettingDto } from "./dto/create-user-setting.dto"
import type { UpdateUserSettingDto } from "./dto/update-user-setting.dto"

@Controller("user-settings")
export class UserSettingsController {
  constructor(private readonly userSettingsService: UserSettingsService) {}

  @Post()
  create(createUserSettingDto: CreateUserSettingDto) {
    return this.userSettingsService.create(createUserSettingDto)
  }

  @Get()
  findAll() {
    return this.userSettingsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userSettingsService.findOne(id);
  }

  @Get('user/:userId')
  findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userSettingsService.findByUser(userId);
  }

  @Patch(":id")
  update(@Param('id', ParseIntPipe) id: number, updateUserSettingDto: UpdateUserSettingDto) {
    return this.userSettingsService.update(id, updateUserSettingDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userSettingsService.remove(id);
  }
}
