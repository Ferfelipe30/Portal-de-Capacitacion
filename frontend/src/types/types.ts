export interface ApiResponse<T> {
    data: T;
    success: boolean;
    details?: string;
}