declare global {
    type SignInFormData = {
        email: string;
        password: string;
    };

    type SignUpFormData = {
        fullName: string;
        email: string;
        password: string;
        country: string;
        investmentGoals: string;
        riskTolerance: string;
        preferredIndustry: string;
    };

    type CountrySelectProps = {
        name: string;
        label: string;
        control: Control;
        error?: FieldError;
        required?: boolean;
    };

    type FormInputProps = {
        name: string;
        label: string;
        placeholder: string;
        type?: string;
        register: UseFormRegister;
        error?: FieldError;
        validation?: RegisterOptions;
        disabled?: boolean;
        value?: string;
    };

    type Option = {
        value: string;
        label: string;
    };

    type SelectFieldProps = {
        name: string;
        label: string;
        placeholder: string;
        options: readonly Option[];
        control: Control;
        error?: FieldError;
        required?: boolean;
    };

    type FooterLinkProps = {
        text: string;
        linkText: string;
        href: string;
    };

    type SearchCommandProps = {
        renderAs?: 'button' | 'text';
        label?: string;
        initialStocks: StockWithWatchlistStatus[];
        watchlistSymbols?: string[];
        open?: boolean;
        setOpen?: (open: boolean) => void;
        className?: string;
    };

    type WelcomeEmailData = {
        email: string;
        name: string;
        intro: string;
    };

    type User = {
        id: string;
        name: string;
        email: string;
        image?: string | null;
    };

    type Stock = {
        symbol: string;
        name: string;
        exchange: string;
        type: string;
    };

    type StockWithWatchlistStatus = Stock & {
        isInWatchlist: boolean;
    };

    type FinnhubSearchResult = {
        symbol: string;
        description: string;
        displaySymbol?: string;
        type: string;
    };

    type FinnhubSearchResponse = {
        count: number;
        result: FinnhubSearchResult[];
    };

    type StockDetailsPageProps = {
        params: Promise<{
            symbol: string;
        }>;
    };

    type WatchlistButtonProps = {
        symbol: string;
        company: string;
        isInWatchlist: boolean;
        showTrashIcon?: boolean;
        type?: 'button' | 'icon';
        onWatchlistChange?: (symbol: string, isAdded: boolean) => void;
    };

    type QuoteData = {
        c?: number;
        dp?: number;
    };

    type ProfileData = {
        name?: string;
        marketCapitalization?: number;
    };

    type FinancialsData = {
        metric?: { [key: string]: number };
    };

    type SelectedStock = {
        symbol: string;
        company: string;
        currentPrice?: number;
    };

    type WatchlistTableProps = {
        watchlist: StockWithData[];
    };
    type UserForNewsEmail = {
        email: string;
        name?: string;
    };

    type StockWithData = {
        userId: string;
        symbol: string;
        company: string;
        addedAt: Date;
        currentPrice?: number;
        changePercent?: number;
        priceFormatted?: string;
        changeFormatted?: string;
        marketCap?: string;
        peRatio?: string;
    };

    type AlertsListProps = {
        alertData: Alert[] | undefined;
    };

    type MarketNewsArticle = {
        id: number;
        headline: string;
        summary: string;
        source: string;
        url: string;
        datetime: number;
        category: string;
        related: string;
        image?: string;
    };

    type WatchlistNewsProps = {
        news?: MarketNewsArticle[];
    };


    type AlertData = {
        symbol: string;
        company: string;
        alertName: string;
        alertType: 'upper' | 'lower';
        threshold: string;
    };

    type AlertModalProps = {
        alertId?: string;
        alertData?: AlertData;
        action?: string;
        open: boolean;
        setOpen: (open: boolean) => void;
    };

    type RawNewsArticle = {
        id: number;
        headline?: string;
        summary?: string;
        source?: string;
        url?: string;
        datetime?: number;
        image?: string;
        category?: string;
        related?: string;
    };

    type Alert = {
        id: string;
        symbol: string;
        company: string;
        alertName: string;
        currentPrice: number;
        alertType: 'upper' | 'lower';
        threshold: number;
        changePercent?: number;
    };

    type RecommendationTrend = {
        buy: number;
        hold: number;
        period: string;
        sell: number;
        strongBuy: number;
        strongSell: number;
        symbol: string;
    };

    type EarningsCalendarEvent = {
        date: string;
        epsActual: number | null;
        epsEstimate: number | null;
        hour: string;
        quarter: number;
        revenueActual: number | null;
        revenueEstimate: number | null;
        symbol: string;
        year: number;
    };

    type BasicFinancials = {
        symbol: string;
        metricType: string;
        series: any;
        metric: {
            '10DayAverageTradingVolume'?: number;
            '52WeekHigh'?: number;
            '52WeekLow'?: number;
            '52WeekLowDate'?: string;
            '52WeekPriceReturnDaily'?: number;
            'beta'?: number;
            'epsExclExtraItemsAnnual'?: number;
            'epsExclExtraItemsTTM'?: number;
            'epsGrowthQuarterlyYoy'?: number;
            'epsGrowthTTMYoy'?: number;
            'peExclExtraItemsTTM'?: number;
            'peAnnual'?: number;
            'psTTM'?: number;
            'dividendYieldIndicatedAnnual'?: number;
            'netProfitMarginAnnual'?: number;
            'netProfitMarginTTM'?: number;
            'revenueGrowthQuarterlyYoy'?: number;
            'revenueGrowthTTMYoy'?: number;
            'roeTTM'?: number;
            'marketCapitalization'?: number;
        };
    };
    type EconomicEvent = {
        actual: number | null;
        country: string;
        estimate: number | null;
        event: string;
        impact: 'low' | 'medium' | 'high' | string;
        prev: number | null;
        time: string;
        unit: string;
    };
}

export {};