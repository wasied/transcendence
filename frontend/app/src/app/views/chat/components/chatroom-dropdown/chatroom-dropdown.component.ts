import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ChatroomsService } from 'src/app/core/services/chatrooms.service';
import { UsersService } from 'src/app/core/services/users.service';
import { Observable, Subscription } from 'rxjs';
import { httpErrorHandler } from 'src/app/http-error-handler';
import { User } from 'src/app/core/models/user.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AccessControlService } from 'src/app/core/services/access-control.service';

@Component({
	selector: 'app-chatroom-dropdown',
	templateUrl: './chatroom-dropdown.component.html',
	styleUrls: ['./chatroom-dropdown.component.css']
})
export class ChatroomDropdownComponent implements OnInit, OnDestroy {

	@Input() chatroomId!: number;
	@Input() participants!: User[];
	@Input() participantsId!: number[];

	isOpen: boolean = false;
	
	isAllowedToCoerce$!: Observable<boolean>;
	canCoerce!: boolean;

	private subscription!: Subscription;

	participantMuteId!: number;
	participantBanId!: number;
	isModalMuteOpen: boolean = false;
	isModalBanOpen: boolean = false;
	durationMuteForm!: FormGroup;
	durationBanForm!: FormGroup;

	constructor (
		private usersService: UsersService,
		private chatroomsService: ChatroomsService,
		private router: Router,
		private accessControlService: AccessControlService,
		private formBuilder: FormBuilder
	) {
		this.durationMuteForm = this.formBuilder.group({
			durationMute: ['']
		});
		this.durationBanForm = this.formBuilder.group({
			durationBan: ['']
		});
	}

	async ngOnInit(): Promise<void> {
		const me = await this.usersService.getMe().toPromise()
			.catch(err => { httpErrorHandler(err); });
		if (!me)
			return ;
		for (const index in this.participants) {
			if (this.participants[index].id === me.id)
				delete this.participants[index];
		}
		this.participants = this.participants.filter(participant => participant !== null && participant !== undefined);
	}

	async handleMute(): Promise<void> {
		var duration: number | string | null = this.durationMuteForm.get('durationMute')?.value;
		if (!duration || (typeof duration === 'string' && (duration === '' || !(+duration))))
			return ;
		if (typeof duration === 'string')
			duration = +duration;

		this.closeModalMute();
		await this.chatroomsService.muteUserFromChatroom(this.chatroomId, this.participantMuteId, duration).toPromise()
			.catch(err => { httpErrorHandler(err); });
	}

	async handleBan(): Promise<void> {
		var duration: number | string | null = this.durationBanForm.get('durationBan')?.value;
		if (!duration || (typeof duration === 'string' && (duration === '' || !(+duration))))
			return ;
		if (typeof duration === 'string')
			duration = +duration;

		this.closeModalBan();
		await this.chatroomsService.banUserFromChatroom(this.chatroomId, this.participantBanId, duration).toPromise()
			.catch(err => { httpErrorHandler(err); });
	}
	
	toggleDropdown(): void {
		this.isOpen = !this.isOpen;
	}

	isAllowedToCoerce(participantId: number) : boolean {
		return true; 
	}

	async kickUser(participantId: number) : Promise<void> {
		await this.chatroomsService.kickUserFromChatroom(this.chatroomId, participantId).toPromise()
			.catch(err => { httpErrorHandler(err); });
	}

	async banUser(participantId: number) : Promise<void> {
		await this.chatroomsService.banUserFromChatroom(this.chatroomId, participantId, 90).toPromise()
			.catch(err => { httpErrorHandler(err); });
	}

	async muteUser(participantId: number) : Promise<void> {
		await this.chatroomsService.muteUserFromChatroom(this.chatroomId, participantId, 90).toPromise()
			.catch(err => { httpErrorHandler(err); });
	}

	async blockUser(participantId: number) : Promise<void> {
		await this.usersService.blockUser(participantId).toPromise()
			.catch(err => { httpErrorHandler(err); });
	}

	/* GUARD */

	grantAccess(): void {
	this.accessControlService.setAccess(true);
	}

	seeUserProfile(participantId: number) : void {
		this.accessControlService.setAccess(true);
		this.router.navigate(['main', 'profile', participantId]);
	}


	async makeAdmin(participantId: number) : Promise<void> {
		await this.chatroomsService.makeUserAnAdmin(this.chatroomId, participantId).toPromise();
	}

	async makeNonAdmin(participantId: number) : Promise<void> {
		await this.chatroomsService.makeUserANonAdmin(this.chatroomId, participantId).toPromise();
	}

	invitePong(participantId: number) : void {
		this.router.navigateByUrl(`main/game?chatroom_id=${this.chatroomId}`);
	}

	isAllowedToElevateToAdmin(participantId: number) : boolean {
		return true;
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}

	/* MODAL HANDLING */

	openModalMute(participantId: number): void {
		this.participantMuteId = participantId;
		this.isModalMuteOpen = true;
	}

	openModalBan(participantId: number): void {
		this.participantBanId = participantId;
		this.isModalBanOpen = true;
	}

	closeModalMute(): void {
		this.isModalMuteOpen = false;
	}

	closeModalBan(): void {
		this.isModalBanOpen = false;
	}
}
