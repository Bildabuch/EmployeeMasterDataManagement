package com.kaestner.config

import com.kaestner.config.BeanUtil.Companion.getBean
import org.springframework.context.ApplicationContext
import org.springframework.context.ApplicationContextAware
import org.springframework.stereotype.Component

/**
 * Utility to access Spring beans from places where dependency injection is not available.
 *
 * This class captures the ApplicationContext provided by Spring and exposes a simple
 * static accessor to retrieve beans programmatically. Use sparingly — prefer constructor
 * injection where possible. This helper is primarily intended for legacy code, JPA
 * entity listeners or other scenarios where injection is not feasible.
 */
@Component
class BeanUtil : ApplicationContextAware {
    companion object {
        /**
         * The current Spring application context. It is set by Spring during startup.
         * Accessing this property before the context is set will cause an exception.
         */
        private lateinit var context: ApplicationContext

        /**
         * Retrieve a bean instance of the requested type from the Spring context.
         *
         * @param T the type of the bean to retrieve
         * @param beanClass the class object of the bean type
         * @return the bean instance managed by Spring
         * @throws org.springframework.beans.factory.NoSuchBeanDefinitionException if no bean of the requested type exists
         * @throws UninitializedPropertyAccessException if called before the ApplicationContext has been set
         */
        fun <T> getBean(beanClass: Class<T>): T = context.getBean(beanClass)
    }

    /**
     * Called by the Spring framework to provide the ApplicationContext.
     * The implementation stores the context in the companion object so it can
     * be accessed statically via [getBean].
     *
     * This method is invoked during application startup by Spring and should not
     * be called manually.
     */
    override fun setApplicationContext(applicationContext: ApplicationContext) {
        context = applicationContext
    }
}
