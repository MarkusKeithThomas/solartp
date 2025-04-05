package ecommerce.project.utils;

import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Component
public class RedisKeyPrefix {
    public static final String PRODUCT_DETAIL = "product_detail:";
    public static final String GUEST_CART = "guest_cart:";
    public static final String PRODUCT_VIEW = "product_view:";
    public static final String USER_CART = "user_cart:";
    public static final String VIEW_KEY_PREFIX = "product_views_count:";
    public static final String STOCK_KEY_PREFIX = "stock:";


}
