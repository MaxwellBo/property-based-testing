import * as fc from 'fast-check';
import { Arbitrary } from 'fast-check';

enum Level {
    Debug,
    Info,
    Warning,
    Error,
    Fatal
}


interface LogReport {
    level?: Level,
    message: string
    attributes?: Object
}
const arbLogReport = fc.record({
    level: arbLevel
})

const DEFAULTS = { level: Level.Info }

interface LoggerProps {
    enricher?: (report: LogReport) => LogReport
}

export class Logger {
    private enricher: LoggerProps['enricher']

    constructor(
        props: LoggerProps
    ) {
        this.enricher = props.enricher
    }

    private async report(report: LogReport) {
        const enriched = this.enricher ? this.enricher(report) : report
        console.log(enriched)
    }

    async log(report: LogReport) {
        await this.report({...DEFAULTS, ...report })
    }
}