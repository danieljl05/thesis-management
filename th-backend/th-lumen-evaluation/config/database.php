<?php
return [
    'default' => 'mysql',
    'connections' => [
        'mysql' => [
            'driver' => 'mysql',
            'host' => env('DB_HOST'),
            'database' => env('DB_DATABASE'),
            'username' => env('DB_USERNAME'),
            'password' => env('DB_PASSWORD'),
            'charset'   => 'utf8mb4',
			'collation' => 'utf8mb4_unicode_ci',
			'strict' => false,
			'engine' => null,
			// 'unix_socket' => '/var/run/mysqld/mysqld.sock',
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : []
        ]
	],
	'migrations' => 'migrations',
	'redis' => [
		'client' => 'predis',
		'default' => [
			'host' => env('REDIS_HOST', '127.0.0.1'),
			'password' => env('REDIS_PASSWORD', null),
			'port' => env('REDIS_PORT', 6379),
			'database' => 0,
		],
	],
];