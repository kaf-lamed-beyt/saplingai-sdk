export interface Account {
    accepts?: number;
    active_users?: Record<string, any>;
    by_api_key?: Record<string, any>;
    by_endpoint?: Record<string, any>;
    currency?: string;
    daily_usage?: any;
    data?: Record<string, any>;
    edits_accepted?: number;
    edits_ignored?: number;
    edits_shown?: number;
    end_date?: string;
    end_days_back?: number;
    ignores?: number;
    interval?: string;
    key?: string;
    last_updated?: any;
    monthly_usage?: any;
    quota?: number;
    return_usage?: boolean;
    start_date?: string;
    start_days_back?: number;
    total_characters?: number;
    total_cost_usd?: number;
    usage?: Record<string, any>;
}
export interface AccountLoadMatch {
    return_usage?: boolean;
    $action?: string;
    [action: string]: any;
}
export interface AccountCreateData {
    accepts?: number;
    active_users?: Record<string, any>;
    by_api_key?: Record<string, any>;
    by_endpoint?: Record<string, any>;
    currency?: string;
    daily_usage?: any;
    data?: Record<string, any>;
    edits_accepted?: number;
    edits_ignored?: number;
    edits_shown?: number;
    end_date?: string;
    end_days_back?: number;
    ignores?: number;
    interval?: string;
    key?: string;
    last_updated?: any;
    monthly_usage?: any;
    quota?: number;
    return_usage?: boolean;
    start_date?: string;
    start_days_back?: number;
    total_characters?: number;
    total_cost_usd?: number;
    usage?: Record<string, any>;
    $action?: string;
    [action: string]: any;
}
export interface Analysi {
    categories?: any[];
    characters?: number;
    context?: string;
    created?: boolean;
    created_at?: string;
    fields: any[];
    key?: string;
    keywords?: any[];
    labels: any[];
    lang?: string;
    multi_label?: boolean;
    name: string;
    neighbors?: any[];
    query: string;
    results?: any[];
    return_usage?: boolean;
    rubric?: boolean;
    rules?: any[];
    ruleset?: string;
    sentence_scores?: boolean;
    suggestions?: boolean;
    synonyms?: any[];
    text?: string;
    texts?: any[];
    threshold?: number;
    updated_at?: string;
    usage?: Record<string, any>;
}
export interface AnalysiListMatch {
    return_usage?: boolean;
}
export interface AnalysiCreateData {
    categories?: any[];
    characters?: number;
    context?: string;
    created?: boolean;
    created_at?: string;
    fields: any[];
    key?: string;
    keywords?: any[];
    labels: any[];
    lang?: string;
    multi_label?: boolean;
    name: string;
    neighbors?: any[];
    query: string;
    results?: any[];
    return_usage?: boolean;
    rubric?: boolean;
    rules?: any[];
    ruleset?: string;
    sentence_scores?: boolean;
    suggestions?: boolean;
    synonyms?: any[];
    text?: string;
    texts?: any[];
    threshold?: number;
    updated_at?: string;
    usage?: Record<string, any>;
}
export interface AnalysiRemoveMatch {
    key?: string;
    name?: string;
}
export interface CustomFilter {
    case_sensitive?: boolean;
    created_at?: string;
    id?: string;
    inp?: string;
    input?: string;
    key?: string;
    out?: string;
    output?: string;
    return_usage?: boolean;
    updated_at?: string;
    usage?: Record<string, any>;
}
export interface CustomFilterListMatch {
    return_usage?: boolean;
}
export interface CustomFilterCreateData {
    case_sensitive?: boolean;
    created_at?: string;
    id?: string;
    inp?: string;
    input?: string;
    key?: string;
    out?: string;
    output?: string;
    return_usage?: boolean;
    updated_at?: string;
    usage?: Record<string, any>;
}
export interface CustomFilterRemoveMatch {
    id: string;
    return_usage?: boolean;
}
export interface CustomMapping {
    case_sensitive?: boolean;
    created_at?: string;
    description?: string;
    entry?: string;
    id?: string;
    key?: string;
    mapping?: string;
    return_usage?: boolean;
    updated_at?: string;
    usage?: Record<string, any>;
}
export interface CustomMappingListMatch {
    return_usage?: boolean;
}
export interface CustomMappingCreateData {
    case_sensitive?: boolean;
    created_at?: string;
    description?: string;
    entry?: string;
    id?: string;
    key?: string;
    mapping?: string;
    return_usage?: boolean;
    updated_at?: string;
    usage?: Record<string, any>;
}
export interface CustomMappingRemoveMatch {
    id: string;
    return_usage?: boolean;
}
export interface Detection {
    ai_fraction?: number;
    characters?: number;
    key?: string;
    labels?: any[];
    redact?: boolean;
    results?: any[];
    return_usage?: boolean;
    score?: number;
    score_string?: string;
    segments?: boolean;
    sent_scores?: boolean;
    sentence_scores?: any[];
    spans?: boolean;
    text?: string;
    texts?: any[];
    threshold?: number;
    toks?: any[];
    top_k?: number;
    types?: any[];
    usage?: Record<string, any>;
    version?: string;
}
export interface DetectionCreateData {
    ai_fraction?: number;
    characters?: number;
    key?: string;
    labels?: any[];
    redact?: boolean;
    results?: any[];
    return_usage?: boolean;
    score?: number;
    score_string?: string;
    segments?: boolean;
    sent_scores?: boolean;
    sentence_scores?: any[];
    spans?: boolean;
    text?: string;
    texts?: any[];
    threshold?: number;
    toks?: any[];
    top_k?: number;
    types?: any[];
    usage?: Record<string, any>;
    version?: string;
}
export interface Dictionary {
    case_sensitive?: boolean;
    created_at?: string;
    entry?: string;
    id?: string;
    key?: string;
    return_usage?: boolean;
    updated_at?: string;
    usage?: Record<string, any>;
}
export interface DictionaryListMatch {
    return_usage?: boolean;
}
export interface DictionaryCreateData {
    case_sensitive?: boolean;
    created_at?: string;
    entry?: string;
    id?: string;
    key?: string;
    return_usage?: boolean;
    updated_at?: string;
    usage?: Record<string, any>;
}
export interface DictionaryRemoveMatch {
    id: string;
    return_usage?: boolean;
}
export interface File {
    chunks?: any[];
    html: string;
    key?: string;
    max_length: number;
    return_usage?: boolean;
    step_size?: number;
    text: string;
    usage?: Record<string, any>;
}
export interface FileCreateData {
    chunks?: any[];
    html: string;
    key?: string;
    max_length: number;
    return_usage?: boolean;
    step_size?: number;
    text: string;
    usage?: Record<string, any>;
}
export interface Generation {
    characters?: number;
    context: Record<string, any>;
    formality?: string;
    key?: string;
    lang?: string;
    length?: string;
    mapping?: string;
    num_results?: number;
    preserve_terms?: any[];
    query: string;
    reading_level?: string;
    results?: any[];
    return_usage?: boolean;
    session_id?: string;
    source_lang?: string;
    target_lang: string;
    tense_mapping?: string;
    text: string;
    texts?: any[];
    tone_mapping?: string;
    usage?: Record<string, any>;
}
export interface GenerationCreateData {
    characters?: number;
    context: Record<string, any>;
    formality?: string;
    key?: string;
    lang?: string;
    length?: string;
    mapping?: string;
    num_results?: number;
    preserve_terms?: any[];
    query: string;
    reading_level?: string;
    results?: any[];
    return_usage?: boolean;
    session_id?: string;
    source_lang?: string;
    target_lang: string;
    tense_mapping?: string;
    text: string;
    texts?: any[];
    tone_mapping?: string;
    usage?: Record<string, any>;
}
export interface Proofreading {
    auto_apply?: boolean;
    include_error_categories?: boolean;
    key?: string;
    lang?: string;
    return_usage?: boolean;
    session_id?: string;
    text: string;
    user_id?: string;
    variety?: string;
}
export interface ProofreadingCreateData {
    auto_apply?: boolean;
    include_error_categories?: boolean;
    key?: string;
    lang?: string;
    return_usage?: boolean;
    session_id?: string;
    text: string;
    user_id?: string;
    variety?: string;
}
export interface Service {
    build?: string;
    msg?: string;
    version?: string;
}
export interface ServiceLoadMatch {
    build?: string;
    msg?: string;
    version?: string;
}
