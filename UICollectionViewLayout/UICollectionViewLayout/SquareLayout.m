
/*
     File: SquareLayout.m
 Abstract: 
 
  Version: 1.0
 */

#import "SquareLayout.h"

#define ITEM_SIZE 70
#define MEDIUM_SIZE _side/2.0f

@implementation SquareLayout

-(void)prepareLayout
{
    [super prepareLayout];
    
    CGSize size = self.collectionView.frame.size;
    _cellCount = [[self collectionView] numberOfItemsInSection:0];
    _center = CGPointMake(size.width / 2.0, size.height / 2.0);
    _radius = MIN(size.width, size.height) / 2.5;
    _side = sqrtf(2*pow(_radius, 2));
}

-(CGSize)collectionViewContentSize
{
    return [self collectionView].frame.size;
}

- (UICollectionViewLayoutAttributes *)layoutAttributesForItemAtIndexPath:(NSIndexPath *)path
{
    CGFloat cx = (_center.x + _radius * cosf(2 * path.item * M_PI / _cellCount));
    CGFloat cy = (_center.y + _radius * sinf(2 * path.item * M_PI / _cellCount));
    CGFloat dx = abs(cx - (cx > _center.x ? ((_side/2.0f) + _center.x) : _center.x - ((_side/2.0f))));
    CGFloat dy = abs(cy - (cy > _center.y ? ((_side/2.0f) + _center.y) : _center.y - ((_side/2.0f))));

    if (cx > (_center.x + MEDIUM_SIZE)) {
        cx -= dx;
    }
    else if (cx < (_center.x - MEDIUM_SIZE)){
        cx += dx;
    }
    
    if (cy > (_center.y + MEDIUM_SIZE)) {
        cy -= dy;
    }
    else if (cy < (_center.y - MEDIUM_SIZE)){
        cy += dy;
    }
    
    UICollectionViewLayoutAttributes* attributes = [UICollectionViewLayoutAttributes layoutAttributesForCellWithIndexPath:path];
    attributes.size = CGSizeMake(ITEM_SIZE, ITEM_SIZE);
    attributes.center = CGPointMake(cx, cy);
//    attributes.center = CGPointMake(cx > _center.x ? cx-dx : (cx < _center.x ? cx+dx : _center.x),
//                                    cy > _center.y ? cy-dy : (cy < _center.y ? cy+dy : _center.y));
    return attributes;
}

-(NSArray*)layoutAttributesForElementsInRect:(CGRect)rect
{
    NSMutableArray* attributes = [NSMutableArray array];
    for (NSInteger i=0 ; i < self.cellCount; i++) {
        NSIndexPath* indexPath = [NSIndexPath indexPathForItem:i inSection:0];
        [attributes addObject:[self layoutAttributesForItemAtIndexPath:indexPath]];
    }    
    return attributes;
}

- (UICollectionViewLayoutAttributes *)initialLayoutAttributesForInsertedItemAtIndexPath:(NSIndexPath *)itemIndexPath
{
    UICollectionViewLayoutAttributes* attributes = [self layoutAttributesForItemAtIndexPath:itemIndexPath];
    attributes.alpha = 0.0;
    attributes.center = CGPointMake(_center.x, _center.y);
    return attributes;
}

- (UICollectionViewLayoutAttributes *)finalLayoutAttributesForDeletedItemAtIndexPath:(NSIndexPath *)itemIndexPath
{
    UICollectionViewLayoutAttributes* attributes = [self layoutAttributesForItemAtIndexPath:itemIndexPath];
    attributes.alpha = 0.0;
    attributes.center = CGPointMake(_center.x, _center.y);
    attributes.transform3D = CATransform3DMakeScale(0.1, 0.1, 1.0);
    return attributes;
}

@end
