<?php


namespace Dam\Core;


interface PathInfo
{
    public function getPathInfo(): array;

    public function getMainFolder(): string;
}