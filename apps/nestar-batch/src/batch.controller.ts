import { Controller, Get, Logger } from '@nestjs/common';
import { BatchService } from './batch.service';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { BATCH_TOP_AGENTS, BATCH_TOP_PROPERTIES, BATCH_TOP_ROLLBACK } from './lib/config';

@Controller()
export class BatchController {
	private logger: Logger = new Logger("BatchController");

	constructor(private readonly BatchService: BatchService) { }


	@Timeout(1000)
	handleTimeout() {
		this.logger.debug('BTACH SERVER READY!');
	}

	@Cron("00 * * * * *", { name: BATCH_TOP_ROLLBACK })
	public async batchRoolback() {
		try {
			this.logger["context"] = BATCH_TOP_ROLLBACK;
			this.logger.debug('EXECUTED!');
			await this.BatchService.batchRollback();
		} catch (err) {
			this.logger.error(err);
		}

	}

	@Cron("20 * * * * *", { name: BATCH_TOP_PROPERTIES })
	public async batchProperties() {
		try {
			this.logger["context"] = BATCH_TOP_PROPERTIES;
			this.logger.debug('EXECUTED!');
			await this.BatchService.batchProperties();
		} catch (err) {
			this.logger.error(err);
		}
	}

	@Cron("40 * * * * *", { name: BATCH_TOP_AGENTS })
	public async batchAgents() {
		try {
			this.logger["context"] = BATCH_TOP_AGENTS;
			this.logger.debug('EXECUTED!');
			await this.BatchService.batchAgents();
		} catch (err) {
			this.logger.error(err);
		}
	}

	/*
		@Interval(1000)
		handleInterval() {
			this.logger.debug('INTERNAL TEST');
		}
	*/

	@Get()
	getHello(): string {
		return this.BatchService.getHello();
	}
}
